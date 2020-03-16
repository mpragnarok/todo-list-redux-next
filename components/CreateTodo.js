import React from "react";
import "../static/sass/CreateTodo.scss";
import { Row, Col, Input, Button, Breadcrumb } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

class CreateTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoText: ""
    };
    this.onChangeTodoText = this.onChangeTodoText.bind(this);
  }

  onChangeTodoText(e) {
    this.setState({
      todoText: e.target.value
    });
  }
  render() {
    return (
      <div className="create-todo">
        <Row gutter={[16, 16]} justify="center" align="middle">
          <h1>Create Todos</h1>
        </Row>
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col span={8}>
            <Input placeholder="Create todo here"></Input>
          </Col>
          <Col span={4}>
            <Button danger type="primary" className="button-margin">
              Cancel
            </Button>{" "}
            <Button type="primary" icon={<PlusCircleOutlined />}>
              Add Todo
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Breadcrumb className="">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application Center</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
      </div>
    );
  }
}

export default CreateTodo;
