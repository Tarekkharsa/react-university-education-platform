// material
import {Button, Container, Stack, Typography} from '@mui/material'
import Iconify from 'components/Iconify'
import {FullPageSpinner} from 'components/lib'
// components
import Page from 'components/Page'
import ReactTable from 'components/ReactTable'
import {useClient} from 'context/auth-context'
import {useCallback, useMemo, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Link as RouterLink, useParams} from 'react-router-dom'
import {tableColumns, tableHiddenColumns} from './data'

// ----------------------------------------------------------------------

export default function ShowCourseAssignments() {
  const {id} = useParams()

  const columns = useMemo(() => tableColumns, [])
  const hiddenColumns = useMemo(() => tableHiddenColumns, [])
  const [rows, setRows] = useState([])
  let selectedRowsIds = []

  const client = useClient()
  const queryClient = useQueryClient()
  // add modle
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {isLoading, error, data, refetch} = useQuery({
    queryKey: 'assignments',
    queryFn: () =>
      client(`module/assignment/getCourseAssignments?course_id=${id}`).then(
        data => data?.data,
      ),
  })
  const {mutate: handleRemoveClick} = useMutation(
    data => client(`module/delete`, {method: 'POST', data}),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('assignments')
      },
    },
  )

  const getSelectedRows = useCallback(({selectedFlatRows}) => {
    selectedRowsIds = []
    selectedFlatRows.length > 0 &&
      selectedFlatRows.map((row, i) => {
        selectedRowsIds.push(row.values.id)
      })
    setRows(selectedRowsIds)
  }, [])

  const onDelete = selectedRows => {
    selectedRowsIds = []
    selectedRows.length > 0 &&
      selectedRows.map((row, i) => {
        selectedRowsIds.push(row.values.cmid)
      })
    handleRemoveClick({module_ids: selectedRowsIds})
  }

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Assignments">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="assignments" />
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`/dashboard/course_assignments/${id}/add`}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            <FormattedMessage id="new_assignment" />
          </Button>
        </Stack>
        <ReactTable
          columns={columns}
          hiddenColumns={hiddenColumns}
          data={data?.courseAssignments[0]?.assignments}
          getSelectedRows={getSelectedRows}
          onDelete={onDelete}
          loading={isLoading}
          totalRecords={data?.courseAssignments[0]?.assignments?.length}
        />
      </Container>
    </Page>
  )
}
