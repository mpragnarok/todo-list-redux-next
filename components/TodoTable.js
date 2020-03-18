import React, { useContext, useState, useEffect, useRef } from "react";

import { connect } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  updateTodo,
  setVisibilityFilter
} from "../store/actions/actionCreator";
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from "../store/actions/actionsTypes";
import { bindActionCreators } from "redux";

import { Tabs, Table, Row, Col, Button, Input, Popconfirm, Form } from "antd";
import { CheckOutlined, MinusOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;

import "../public/static/sass/TodoTable.scss";
const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };
  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
class TodoTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.columns = [
      {
        title: "Todos",
        dataIndex: "text",
        width: "80%",
        editable: true,
        render: (text, row) => (
          <span
            style={{
              textDecoration: row.completed ? "line-through" : "none",
              color: row.completed ? "gray" : "black"
            }}
          >
            {text}
            {row.completed ? "(completed)" : ""}
          </span>
        )
      },
      {
        title: "Actions",
        dataIndex: "action",
        render: (text, record) =>
          this.props.todos.length >= 1 ? (
            <div>
              <Button
                shape="circle"
                icon={<CheckOutlined />}
                className="action-button"
                onClick={() => this.props.toggleTodo(record.id)}
              />

              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.props.deleteTodo(record.id)}
              >
                <Button shape="circle" icon={<MinusOutlined />} />
              </Popconfirm>
            </div>
          ) : null
      }
    ];
  }

  handleSave = record => {
    this.props.updateTodo(record);
  };
  tabKeyToActionType = key => {
    switch (key) {
      case "1":
        this.props.setVisibilityFilter(SHOW_ALL);
        return;
      case "2":
        this.props.setVisibilityFilter(SHOW_COMPLETED);
        return;
      case "3":
        this.props.setVisibilityFilter(SHOW_ACTIVE);
        return;
      default:
        throw new Error("Unknown filter key: " + key);
    }
  };
  render() {
    // const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <div className="todo-table">
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Tabs onChange={this.tabKeyToActionType} type="card">
            <TabPane tab="All" key="1" />
            <TabPane tab="Completed" key="2" />
            <TabPane tab="Active" key="3" />
          </Tabs>
        </Row>
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col span={12}>
            <Table
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={this.props.todos}
              columns={columns}
              rowKey={todo => todo.id}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteTodo,
      toggleTodo,
      updateTodo,
      setVisibilityFilter
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
