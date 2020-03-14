import { Layout, PageHeader, Menu } from "antd";
const { SubMenu } = Menu;
const { Header, Footer, Content } = Layout;
import TodoTable from "../components/TodoTable";
const DefaultLayout = props => (
  <Layout>
    <Header>
      <div className="logo">
        <h1>Todo-List</h1>
      </div>
    </Header>

    <Content>{props.children}</Content>
    <style jsx>{`
      .logo {
        width: 120px;
        height: 64px;
        background: rgba(255, 255, 255, 0.2);
        colormargin: 16px 28px 16px 0;
        float: left;
      }
      .logo h1 {
        color: white;
        text-align: center;
      }
    `}</style>
  </Layout>
);

export default DefaultLayout;
