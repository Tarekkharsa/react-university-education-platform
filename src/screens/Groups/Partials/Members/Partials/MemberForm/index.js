import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import MultiSelect from 'components/Form/components/MultiDropdown'
import {useClient} from 'context/auth-context'
import {useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQueryClient} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function MemberForm({handleClose}) {
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const MemberSchema = Yup.object().shape({
    user_ids: Yup.array().required(),
  })

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(MemberSchema),
    defaultValues: {user_ids: []},
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(`group/addMembers`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('members')
        handleClose()
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    let {user_ids} = data
    let ids = user_ids.map(user => user.id)
    mutate({user_ids: ids, group_id: id})
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}
        <MultiSelect
          name={'user_ids'}
          title={'members'}
          optionLable={'username'}
          optionUrl={'getAllUsers'}
          errors={errors}
          control={control}
          handleChange={value => setValue('user_ids', value)}
          multiple
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          onClick={handleClose}
          size="large"
          type="submit"
          variant="contained"
          sx={{mr: 2}}
        >
          <FormattedMessage id="cancel" />
        </LoadingButton>
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          <FormattedMessage id="save" />
        </LoadingButton>
      </Stack>
    </form>
  )
}
