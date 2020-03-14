import DefaultLayout from "../components/Layout";
import TodoTable from "../components/TodoTable";
import CreateTodo from "../components/CreateTodo";
const Index = () => (
  <DefaultLayout>
    <CreateTodo />
    <TodoTable />
  </DefaultLayout>
);

export default Index;
