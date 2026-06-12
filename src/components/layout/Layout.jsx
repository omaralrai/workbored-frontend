import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header className="navbar">
        <div className="logo">
          <span className="logo-mark" />
          <span><span className="work">Work</span><span className="board">Bored</span></span>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
