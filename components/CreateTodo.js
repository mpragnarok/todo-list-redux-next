import React from "react";
import { Row, Col } from "antd";

class CreateTodo extends React.Component {
  render() {
    return (
      <div className="create-todo">
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col>
            <h1>Create Todos</h1>
          </Col>
        </Row>

        <style jsx>{`
          .create-todo {
            margin-top: 50px;
          }
        `}</style>
      </div>
    );
  }
}

export default CreateTodo;
