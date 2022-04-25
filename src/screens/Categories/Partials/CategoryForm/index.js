import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import CustomInput from 'components/Form/components/CustomInput'
import RichText from 'components/Form/components/RichText'
import {FullPageSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function CategoryForm({onSubmit}) {
  const {id} = useParams()
  const {state} = useLocation()

  console.log('state', state)

  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const CategorySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
  })
  const [ritchText, setRitchText] = useState('')

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues: {name: '', description: ''},
  })

  const {
    isLoading: fetchLoading,
    error: getOneError,
    data: category,
  } = useQuery({
    queryKey: 'category',
    queryFn: () =>
      client(`getCategories?key=id&value=${id}`).then(data => data.data[0]),
    enabled: id !== undefined,
  })

  useEffect(() => {
    if (category && id !== undefined) {
      setRitchText(category.description)
      reset(category)
    }
  }, [category])

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(id ? `updateCategory` : `createCategory`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('categories')
        navigate('/dashboard/categories')
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    let {name, description} = data
    mutate({
      name,
      description,
      parent_id: state !== null ? state.id : 0,
      id: id ? id : undefined,
    })
  }

  if (fetchLoading) {
    return <FullPageSpinner />
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}

        <CustomInput
          label="Category Name"
          name="name"
          control={control}
          errors={errors}
        />

        <RichText
          label="Description"
          name="description"
          width="100%"
          editValue={ritchText}
          InputChange={(name, value) => setValue('description', value)}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          onClick={() => navigate('/dashboard/categories')}
          size="large"
          type="submit"
          variant="contained"
          sx={{mr: 2}}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          {id ? 'Update Category' : 'Create Category'}
        </LoadingButton>
      </Stack>
    </form>
  )
}