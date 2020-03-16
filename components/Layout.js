import { Layout, PageHeader, Menu } from "antd";
const { SubMenu } = Menu;
const { Header, Footer, Content } = Layout;
import "../public/static/sass/Layout.scss";
import TodoTable from "../components/TodoTable";
const DefaultLayout = props => (
  <Layout>
    <Header>
      <div className="logo">
        <h1>Todo-List</h1>
      </div>
    </Header>

    <Content>{props.children}</Content>
  </Layout>
);

export default DefaultLayout;
