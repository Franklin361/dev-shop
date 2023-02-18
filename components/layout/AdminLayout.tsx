import Head from 'next/head';
import { Drawer, AdminNavBar } from '../';
import { ILayoutShop } from '../../interfaces';

interface Props extends ILayoutShop {
  children: JSX.Element | JSX.Element[];
}

export const AdminLayout = ({
  children,
  title = 'Dev Shop | Admin',
}: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Drawer>
        <AdminNavBar />

        <main className='mx-auto w-full max-w-screen-xl px-3 mb-16'>
          {children}
        </main>
      </Drawer>
    </div>
  );
};
