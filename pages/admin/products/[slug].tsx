import { NextPage, GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  AdminLayout,
  CustomInput,
  CustomTextArea,
  HeaderAdmin,
  Icon,
  ImageForm,
  InputGroup,
  Loading,
  TagsForm,
} from '../../../components';
import { dbProducts } from '../../../database';
import { IProduct, ISize } from '../../../interfaces';
import { ProductModel } from '../../../models';
import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { devShopApi } from '../../../services';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface Props {
  product: IProduct;
}

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
  gender: string;
}

const ProductAdminPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newTagValue, setNewTagValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingImages, setIsSavingImages] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: product,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'title') {
        const newSlug =
          value.title
            ?.trim()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
            .toLocaleLowerCase() || '';

        setValue('slug', newSlug);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const onChangeSize = (size: string) => {
    const currentSizes = getValues('sizes');
    if (currentSizes.includes(size))
      return setValue(
        'sizes',
        currentSizes.filter((s) => s !== size),
        { shouldValidate: true }
      );
    setValue('sizes', [...currentSizes, size], { shouldValidate: true });
  };

  const onNewTag = () => {
    const newTag = newTagValue.trim().toLocaleLowerCase();
    setNewTagValue('');
    const currentTags = getValues('tags');

    if (currentTags.includes(newTag)) {
      return;
    }

    currentTags.push(newTag);
  };

  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues('tags').filter((t) => t !== tag);
    setValue('tags', updatedTags, { shouldValidate: true });
  };

  const onFilesSelected = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return;

    try {
      setIsSavingImages(true);
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await devShopApi.post<{ message: string }>(
          '/admin/upload',
          formData
        );
        setValue('images', [...getValues('images'), data.message], {
          shouldValidate: true,
        });
      }
      setIsSavingImages(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const onDeleteImage = (image: string) => {
    setValue(
      'images',
      getValues('images').filter((img) => img !== image),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 2) return alert('Min. 2 images');
    setIsSaving(true);

    try {
      await devShopApi({
        url: '/admin/products',
        method: form._id ? 'PUT' : 'POST', // si tenemos un _id, entonces actualizar, si no crear
        data: form,
      });

      setIsSaving(false);
      if (!form._id) router.replace(`/admin/products/${form.slug}`);
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title={`Dev Shop | ${
        product.title ? product.title : 'Creating a new product'
      }`}
    >
      <HeaderAdmin
        icon='product'
        title={`${product.title ? product.title : 'New product'}`}
        subtitle='Edit | Delete'
        color='secondary'
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        {isSaving && (
          <div className='w-full h-full fixed top-0 left-0 bg-black/70 z-50 center'>
            <Loading
              center
              label={
                product._id ? 'Updating product...' : 'Creating product...'
              }
              textClass='mt-14 block text-2xl'
            />
          </div>
        )}

        <div className='mb-5 w-full sticky top-24 flex justify-end z-10'>
          <button
            className={`btn btn-${
              product._id ? 'info' : 'accent'
            } gap-3 font-bold md:w-auto w-full`}
            disabled={isSaving || isSavingImages}
          >
            <Icon
              name='board'
              className='text-3xl'
            />
            <span> {product._id ? 'Save changes' : 'Create product'}</span>
          </button>
        </div>

        <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
          <section>
            <CustomInput
              label='title'
              title='Title'
              register={register}
              errors={errors}
              validation={{
                minLength: { value: 2, message: 'Min. 2 letters' },
              }}
            />

            <CustomTextArea
              label='description'
              title='Description'
              register={register}
              errors={errors}
            />

            <CustomInput
              label='inStock'
              title='Inventory'
              register={register}
              errors={errors}
              validation={{ min: { value: 0, message: 'Min. value 0' } }}
              type='number'
            />

            <CustomInput
              label='price'
              title='Price'
              register={register}
              errors={errors}
              validation={{ min: { value: 0, message: 'Min. value 0' } }}
              type='number'
            />

            <InputGroup
              label='Type'
              name='type'
              current={product.type}
              values={validTypes}
              onChange={(type: string) => setValue('type', type)}
            />

            <InputGroup
              label='Gender'
              name='gender'
              current={product.gender}
              values={validGender}
              onChange={(gender: string) => setValue('gender', gender)}
            />

            <InputGroup
              label='Sizes'
              name='sizes'
              type='checkbox'
              values={validSizes}
              current={product.sizes}
              onChange={(size: string) => onChangeSize(size)}
            />
          </section>

          <section>
            <CustomInput
              label='slug'
              title='Slug - URL'
              register={register}
              errors={errors}
              required={false}
              validation={{
                validate: (val: any) =>
                  val.trim().includes(' ') ? 'No blank spaces' : undefined,
              }}
            />
            <TagsForm
              onChange={({ target }) => setNewTagValue(target.value)}
              onKeyUp={({ code }) =>
                code === 'Space' ? onNewTag() : undefined
              }
              value={newTagValue}
              tags={getValues('tags')}
              onDeleteTag={(tag: string) => onDeleteTag(tag)}
            />

            <hr className='my-5 border border-white/30' />
            {isSavingImages && <Loading label='Uploading image' />}
            <ImageForm
              images={getValues('images') || []}
              onDeleteImage={onDeleteImage}
              onFilesSelected={onFilesSelected}
              ref={fileInputRef}
            />
          </section>
        </div>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  let product: IProduct | null;

  if (slug === 'new') {
    // crear un producto
    const tempProduct = JSON.parse(JSON.stringify(new ProductModel()));
    delete tempProduct._id;
    // tempProduct.images = ['img1.jpg', 'img2.jpg'];
    product = tempProduct;
  } else {
    product = await dbProducts.getProductsBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
