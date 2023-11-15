import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarState } from 'store/expandSlice';

import Sidebar from './sidebar';

import styles from './styles.module.scss';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const showSidebar = useSelector((state: SidebarState) => state.expandSidebar);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(hideDialog());
  // }, []);

  return (
    <div className={styles.layout}>
      {/* <DialogModal /> */}
      <Sidebar />
      <div
        style={{ marginLeft: `${showSidebar ? '280px' : '80px'}` }}
        className={styles.layout__main}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
