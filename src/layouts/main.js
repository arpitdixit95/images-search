import './main.scss';

const MainLayout = (props) => {
  return (
    <main className='main-layout'>
      {props.children}
    </main>
  );
};

export default MainLayout;