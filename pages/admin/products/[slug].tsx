import { NextPage, GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AdminLayout, HeaderAdmin, Icon, Loading } from "../../../components"
import { dbProducts } from '../../../database';
import { IProduct, ISize } from "../../../interfaces";
import { ProductModel } from '../../../models';
import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { devShopApi } from '../../../api';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats']
const validGender = ['men', 'women', 'kid', 'unisex']
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [newTagValue, setNewTagValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
    defaultValues: product
  })


  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'title') {
        const newSlug = value.title?.trim()
          .replaceAll(' ', '_')
          .replaceAll("'", '')
          .toLocaleLowerCase() || '';

        setValue('slug', newSlug);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue])

  const onChangeSize = (size: string) => {
    const currentSizes = getValues('sizes');
    if (currentSizes.includes(size)) {
      return setValue('sizes', currentSizes.filter(s => s !== size), { shouldValidate: true });
    }

    setValue('sizes', [...currentSizes, size], { shouldValidate: true });

  }

  const onNewTag = () => {
    const newTag = newTagValue.trim().toLocaleLowerCase();
    setNewTagValue('');
    const currentTags = getValues('tags');

    if (currentTags.includes(newTag)) {
      return;
    }

    currentTags.push(newTag);
  }

  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues('tags').filter(t => t !== tag);
    setValue('tags', updatedTags, { shouldValidate: true });
  }

  const onFilesSelected = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    try {

      // console.log( file );
      for (const file of target.files as any) {
        const formData = new FormData();
        formData.append('file', file as any);
        const { data } = await devShopApi.post<{ message: string }>('/admin/upload', formData);
        setValue('images', [...getValues('images'), data.message], { shouldValidate: true });
      }


    } catch (error) {
      console.log({ error });
    }
  }

  const onDeleteImage = (image: string) => {
    setValue(
      'images',
      getValues('images').filter(img => img !== image),
      { shouldValidate: true }
    );
  }



  const onSubmit = async (form: FormData) => {

    if (form.images.length < 2) return alert('Min. 2 images');
    setIsSaving(true);

    try {
      const { data } = await devShopApi({
        url: '/admin/products',
        method: form._id ? 'PUT' : 'POST',  // si tenemos un _id, entonces actualizar, si no crear
        data: form
      });

      console.log({ data });
      if (!form._id) {
        router.replace(`/admin/products/${form.slug}`);
      } else {
        setIsSaving(false)
      }


    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }

  }

  return (
    <AdminLayout title={`Dev Shop | ${product.title}`}>
      <HeaderAdmin icon="product" title={product.title} subtitle='Edit | Delete' color='secondary' />


      <form onSubmit={handleSubmit(onSubmit)}>
        {
          isSaving && <div className="w-full h-full fixed top-0 left-0 bg-black/70 z-50 center">
            <Loading center label="Update product..." textClass="mt-14 block text-2xl" />
          </div>
        }

        <div className='mb-5 w-full sticky top-24 flex justify-end z-10'>
          <button className='btn btn-info gap-3 font-bold md:w-auto w-full' disabled={isSaving}>
            <Icon name='board' className='text-3xl' />
            <span>Save changes</span>
          </button>
        </div>

        <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
          <section>

            <div className='flex flex-col gap-3'>
              <label className='text-lg' htmlFor="1">Tittle</label>
              <input type="text" id='1' className='input input-secondary'
                {
                ...register('title', {
                  required: 'This field is required',
                  minLength: { value: 2, message: 'Min. 2 letters' }
                })
                }
              />
              {
                // errors.email && <p className="my-1 text-sm text-error">{errors.email.message}</p>
              }
            </div>

            <div className='flex flex-col gap-3'>
              <label className='text-lg mt-3' htmlFor="2">Description</label>
              <input type="text" id='2' className='input input-secondary'
                {
                ...register('description', {
                  required: 'This field is required'
                })
                }
              />
            </div>

            <div className='flex flex-col gap-3'>
              <label className='text-lg mt-3' htmlFor="3">Inventory</label>
              <input type="number" id='3' className='input input-secondary'
                {
                ...register('inStock', {
                  required: 'This field is required',
                  min: { value: 0, message: 'Min. value 0' }
                })
                }
              />
            </div>

            <div className='flex flex-col gap-3'>
              <label className='text-lg mt-3' htmlFor="4">Price</label>
              <input type="number" id='4' className='input input-secondary'
                {
                ...register('price', {
                  required: 'This field is required',
                  min: { value: 0, message: 'Min. value 0' }
                })
                }
              />
            </div>


            <div className='my-5'>
              <label className='text-lg w-full'> Type</label>
              <hr className='mb-3 mt-2 border border-white/30' />
              <div className='flex gap-5 flex-wrap'>
                {
                  validTypes.map(type => (
                    <label className='capitalize items-center gap-3 flex w-fit cursor-pointer select-none font-bold' key={type}>
                      <input
                        type="radio"
                        name="type"
                        className='radio radio-secondary'
                        defaultChecked={type === product.type}
                      />
                      {type}
                    </label>
                  ))
                }
              </div>
            </div>

            <div className='my-5'>
              <label className='text-lg w-full'> Gender</label>
              <hr className='mb-3 mt-2 border border-white/30' />
              <div className='flex gap-5 flex-wrap'>
                {
                  validGender.map(gender => (
                    <label className='capitalize items-center gap-3 flex w-fit cursor-pointer select-none font-bold' key={gender}>
                      <input
                        type="radio"
                        name="gender"
                        defaultChecked={gender === product.gender}
                        className='radio radio-secondary' />
                      {gender}
                    </label>
                  ))
                }
              </div>
            </div>

            <div className='my-5'>
              <label className='text-lg w-full'> Sizes</label>
              <hr className='mb-3 mt-2 border border-white/30' />
              <div className='flex gap-5 flex-wrap'>
                {
                  validSizes.map(size => (
                    <label className='flex items-center gap-3 font-bold w-fit cursor-pointer select-none' key={size}>
                      <input
                        type="checkbox"
                        name="size"
                        defaultChecked={product.sizes.includes(size as ISize)}
                        className='checkbox checkbox-md checkbox-secondary' />
                      {size}
                    </label>
                  ))
                }
              </div>
            </div>
          </section>

          <section>
            <div className='flex flex-col gap-3'>
              <label className='text-lg' htmlFor="5">Slug - URL</label>
              <input type="text" id='5' className='input input-secondary'
                {
                ...register('slug', {
                  required: 'This field is required',
                  validate: (val) => val.trim().includes(' ') ? 'No puede tener espacios en blanco' : undefined
                })
                }
              />
            </div>
            <div className='flex flex-col gap-3'>
              <label className='text-lg mt-3' htmlFor="6">Tags</label>
              <input type="text" id='6' name="" className='input input-secondary'
                onChange={({ target }) => setNewTagValue(target.value)}
                onKeyUp={({ code }) => code === 'Space' ? onNewTag() : undefined}
                value={newTagValue}
              />
              <span className=" text-sm">press <b>[spacebar]</b> to add tag</span>

              <div className='flex gap-2 flex-wrap mt-2'>
                {
                  getValues('tags').map(tag => (
                    <div className="badge badge-secondary font-bold hover:badge-error cursor-pointer" key={tag} onClick={() => onDeleteTag(tag)}>{tag}</div>
                  ))
                }
              </div>
            </div>
            <hr className='my-5 border border-white/30' />
            <div className='flex flex-col gap-3'>
              <label className='text-lg'>Images</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={onFilesSelected}
                accept='image/png, image/gif, image/jpeg'
                multiple
                className='hidden'
              />
              <button className='btn' onClick={() => fileInputRef.current?.click()}>Upload image</button>
              {
                getValues('images').length < 2 && <span className='text-red-500 text-center p-2 font-bold'>Minimum 2 images</span>
              }

              <div className='grid lg:grid-cols-3 grid-cols-2 gap-5 my-5'>
                {
                  getValues('images').map(img => (

                    <div className='flex flex-col gap-3 items-center' key={img}>
                      <div className='relative w-full h-32'>
                        <Image
                          src={img}
                          layout='fill'
                          className='object-cover rounded-md'
                          alt={img}
                        />
                      </div>
                      <button className='btn btn-error' onClick={() => onDeleteImage(img)}
                      >Delete</button>
                    </div>
                  ))
                }

              </div>


            </div>
          </section>

        </div>
      </form>

    </AdminLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  const { slug = '' } = query;

  let product: IProduct | null;

  if (slug === 'new') {
    // crear un producto
    const tempProduct = JSON.parse(JSON.stringify(new ProductModel()));
    delete tempProduct._id;
    tempProduct.images = ['img1.jpg', 'img2.jpg'];
    product = tempProduct;

  } else {
    product = await dbProducts.getProductsBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      }
    }
  }

  console.log(product)

  return {
    props: {
      product
    }
  }
}


export default ProductAdminPage


