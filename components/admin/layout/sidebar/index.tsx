import { ReactNode, useCallback, useMemo } from 'react';
import { AiFillMessage } from 'react-icons/ai';
import { IoNotificationsSharp } from 'react-icons/io5';
import { MdArrowForwardIos } from 'react-icons/md';
import { RiLogoutCircleFill, RiSettingsLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import sidebarItems from 'data/sideBar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { RootState } from 'store';
import { toggleSidebar } from 'store/expandSlice';
import handleKeyDown from 'utils/helpers/keyboardHandlers';

import styles from './styles.module.scss';

interface SidebarItemProps {
  currentRoute: string;
  route: string;
  href: string;
  icon: ReactNode;
}

function SidebarItem({ currentRoute, route, href, icon }: SidebarItemProps) {
  const isActive = route === currentRoute;
  return (
    <li className={isActive ? styles.active : ''}>
      <Link href={href}>
        {icon}
        <span className={styles.show}>{route}</span>
      </Link>
    </li>
  );
}

function Sidebar() {
  const router = useRouter();
  const route = useMemo(
    () => router.pathname.split('/admin/dashboard/')[1],
    [router.pathname]
  );

  const { data: session } = useSession();
  const { expandSidebar: showSidebar } = useSelector(
    (state: RootState) => state.expand
  );
  const dispatch = useDispatch();

  const handleExpand = useCallback(() => {
    dispatch(toggleSidebar());
  }, [dispatch]);

  return (
    <div className={`${styles.sidebar} ${showSidebar ? styles.opened : ''}`}>
      <div
        className={styles.sidebar__toggle}
        onClick={() => handleExpand()}
        onKeyDown={e => handleKeyDown(e, () => handleExpand())}
        role='button'
        tabIndex={0}
      >
        <div
          style={{
            transform: `${showSidebar ? 'rotate(180deg)' : ''}`,
            transition: 'all .2s',
          }}
        >
          <MdArrowForwardIos />
        </div>
      </div>

      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__header}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.sidebar__user}>
          <img src={`${session?.user?.image}`} alt='사용자 이미지' />
          <div className={styles.show}>
            <span>Welcome back 👋</span>
            <span>{session?.user?.name}</span>
          </div>
        </div>

        <ul className={styles.sidebar__list}>
          {sidebarItems.nav.map(item => (
            <SidebarItem key={item.route} currentRoute={route} {...item} />
          ))}
        </ul>

        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Product</div>
          </div>
          <ul className={styles.sidebar__list}>
            {sidebarItems.Product.map(item => (
              <SidebarItem key={item.route} currentRoute={route} {...item} />
            ))}
          </ul>
        </div>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Categories / Subs</div>
          </div>
          <ul className={styles.sidebar__list}>
            {sidebarItems.Categories.map(item => (
              <SidebarItem key={item.route} currentRoute={route} {...item} />
            ))}
          </ul>
        </div>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Coupons</div>
          </div>
          <ul className={styles.sidebar__list}>
            {sidebarItems.Coupons.map(item => (
              <SidebarItem key={item.route} currentRoute={route} {...item} />
            ))}
          </ul>
        </div>

        <nav>
          <ul
            className={`${styles.sidebar__list} ${
              showSidebar ? styles.nav_flex : ''
            }`}
          >
            <li>
              <Link href='/'>
                <RiSettingsLine />
              </Link>
            </li>
            <li>
              <Link href='/'>
                <IoNotificationsSharp />
              </Link>
            </li>
            <li>
              <Link href='/'>
                <AiFillMessage />
              </Link>
            </li>
            <li>
              <Link href='/'>
                <RiLogoutCircleFill />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
