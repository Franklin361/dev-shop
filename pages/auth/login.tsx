import { GetServerSideProps } from 'next';
import { getProviders, getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthLayout, Icon } from '../../components';
import { isEmail } from '../../utils';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const onSuccess = async ({ email, password }: FormData) => {
    try {
      setLoading(true);
      const data = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      console.log(data);
      if (data?.ok) {
        return router.reload();
      }

      if (data?.error === 'CredentialsSignin') {
        setError('Incorrect credentials');
        setTimeout(() => {
          setError('');
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      router.reload();
    } finally {
      setLoading(false);
    }
  };

  const handleGoToRegister = () => {
    const destination = router.query.p?.toString();
    const url = destination
      ? `/auth/register?p=${destination}`
      : '/auth/register';
    router.push(url);
  };

  return (
    <AuthLayout title='Dev-Shop | Login'>
      <h1 className='text-5xl font-extrabold text-center mt-10 mb-5'>Log in</h1>
      <section>
        <form
          className='flex flex-col max-w-xl mx-auto gap-5 shadow-black/60 shadow-2xl md:p-10 p-2 rounded-xl bg-base-300'
          onSubmit={handleSubmit(onSuccess)}
        >
          {error && (
            <div className='bg-red-500 text-center rounded-full p-1 font-bold center gap-2'>
              {' '}
              <Icon
                name='close'
                className='text-xl'
              />{' '}
              {error}
            </div>
          )}
          {isLoading && (
            <div className='w-full bg-warning text-black rounded-full font-bold flex justify-center items-center'>
              Checking credentials...
            </div>
          )}
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
              className={`input ${errors.email ? 'input-error' : 'input-bordered'
                } text-xl w-full`}
              {...register('email', {
                required: 'This field is required',
                validate: isEmail,
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
              className={`input ${errors.password ? 'input-error' : 'input-bordered'
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
          <div className='flex w-full  mt-5'>
            <button
              disabled={isLoading}
              className='btn flex-1 btn-accent'
              type='submit'
            >
              Log in
            </button>
            <div className='divider divider-horizontal'>OR</div>
            {providers &&
              Object.values(providers).map((provider: any) => {
                if (provider.id === 'credentials')
                  return <div key='credentials' />;
                return (
                  <button
                    disabled={isLoading}
                    className='btn flex-1'
                    type='button'
                    key={provider.id}
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name}
                  </button>
                );
              })}
          </div>

          <p className='text-end'>
            Do not you have an account?
            <span
              className='link link-secondary font-bold'
              onClick={handleGoToRegister}
            >
              {' '}
              Click here to get it
            </span>
          </p>
        </form>
      </section>
    </AuthLayout>
  );
};
export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: any = await getSession({ req: ctx.req });

  const { p = '/' } = ctx.query;

  if (session) {
    const url = session.user.role === 'admin' ? '/admin' : p.toString();
    return {
      redirect: {
        destination: url,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
