import React, { useContext, useState, useEffect, useRef } from "react";

import { connect } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
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
    this.columns = [
      {
        title: "name",
        dataIndex: "name",
        width: "30%",
        editable: true
      },
      {
        title: "age",
        dataIndex: "age"
      },
      { title: "address", dataIndex: "address" },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null
      }
    ];
    this.state = {
      dataSource: [
        {
          key: "0",
          name: "Edward King 0",
          age: "32",
          address: "London, Park Lane no. 0"
        },
        {
          key: "1",
          name: "Edward King 1",
          age: "32",
          address: "London, Park Lane no. 1"
        }
      ],
      count: 2
    };
  }
  handleDelete = key => {
    const dataSource = [...this.state.dataSource];

    this.setState({
      dataSource: dataSource.filter(item => item.key !== key)
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData
    });
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
    const { dataSource } = this.state;
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
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Tabs onChange={this.tabKeyToActionType} type="card">
            <TabPane tab="All" key="1" />
            <TabPane tab="Completed" key="2" />
            <TabPane tab="Active" key="3" />
          </Tabs>
        </Row>
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col span={12}>
            <Table dataSource={this.props.todos} rowKey={todo => todo.id}>
              <Column
                title="Todos"
                dataIndex="text"
                key="text"
                render={(text, row) => (
                  <span
                    style={{
                      textDecoration: row.completed ? "line-through" : "none",
                      color: row.completed ? "gray" : "black"
                    }}
                  >
                    {text}
                    {row.completed ? "(completed)" : ""}
                  </span>
                )}
              />

              <Column
                title="Actions"
                dataIndex="action"
                key="action"
                render={(text, row) => (
                  <span>
                    <Button
                      shape="circle"
                      icon={<CheckOutlined />}
                      className="action-button"
                      onClick={() => this.props.toggleTodo(row.id)}
                    />
                    <Button
                      shape="circle"
                      icon={<MinusOutlined />}
                      onClick={() => this.props.deleteTodo(row.id)}
                    />
                  </span>
                )}
              />
            </Table>
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
      setVisibilityFilter
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
