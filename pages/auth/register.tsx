import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { devShopApi } from '../../services';
import { AuthLayout } from '../../components';
import { isEmail } from '../../utils';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context';
import { getSession, signIn } from 'next-auth/react';

type FormData = {
  email: string;
  password: string;
  name: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState('');
  const { registerUser } = useContext(AuthContext);

  const onSuccess = async ({ email, name, password }: FormData) => {
    const isRegisterCorrect = await registerUser(email, password, name);
    if (isRegisterCorrect.hasError) {
      setError(isRegisterCorrect.msg!);
      setTimeout(() => {
        setError('');
      }, 5000);
      return;
    }

    await signIn('credentials', { email, password, redirect: false });
    const destination = router.query.p?.toString() || '/';
    router.replace(destination);
  };

  const handleGoToLogin = () => {
    const destination = router.query.p?.toString();
    const url = destination ? `/auth/login?p=${destination}` : '/auth/login';
    router.push(url);
  };

  return (
    <AuthLayout title='Dev-Shop | Sign Up'>
      <h1 className='text-5xl font-extrabold text-center my-5'>Sign Up</h1>
      <section>
        <form
          onSubmit={handleSubmit(onSuccess)}
          className='flex flex-col max-w-xl mx-auto gap-5 shadow-black/60 shadow-2xl md:p-10 p-2 rounded-xl bg-base-300'
        >
          {error && (
            <div className='bg-red-500 text-center rounded-full p-1 font-bold center'>
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor=''
              className='mb-2 block font-bold'
            >
              Full Name
            </label>
            <input
              type='text'
              placeholder='example'
              className={`input ${
                errors.name ? 'input-error' : 'input-bordered'
              } text-xl w-full`}
              {...register('name', {
                required: 'This field is required',
                minLength: { value: 2, message: 'Min. 2 characters' },
              })}
            />
            {errors.name && (
              <p className='my-1 text-sm text-error'>{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor=''
              className='mb-2 block font-bold'
            >
              E-mail
            </label>
            <input
              type='email'
              placeholder='example@example.com'
              className={`input ${
                errors.email ? 'input-error' : 'input-bordered'
              } text-xl w-full`}
              {...register('email', {
                validate: isEmail,
                required: 'This field is required',
              })}
            />
            {errors.email && (
              <p className='my-1 text-sm text-error'>{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor=''
              className='mb-2 block font-bold'
            >
              Password
            </label>
            <input
              type='password'
              placeholder='****'
              className={`input ${
                errors.password ? 'input-error' : 'input-bordered'
              } text-xl w-full`}
              {...register('password', {
                required: 'This field is required',
                minLength: { value: 6, message: 'Min. 6 characters' },
              })}
            />
            {errors.password && (
              <p className='my-1 text-sm text-error'>
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            className='btn mt-5 btn-accent'
            type='submit'
          >
            Sign Up
          </button>

          <p className='text-end'>
            Do you already have an account?
            <span
              className='link link-secondary font-bold'
              onClick={handleGoToLogin}
            >
              {' '}
              Click here to log in
            </span>
          </p>
        </form>
      </section>
    </AuthLayout>
  );
};
export default RegisterPage;

import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });

  const { p = '/' } = ctx.query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
