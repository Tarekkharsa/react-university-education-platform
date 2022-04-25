import {UserRoleMoreMenu} from 'sections/@dashboard/user'

export const tableHiddenColumns = ['id']
export const tableColumns = [
  {
    Header: 'ID',
    accessor: 'id',
    disableFilters: true,
  },
  {
    Header: 'User Name',
    accessor: 'username',
    disableFilters: true,
  },
  {
    Header: 'Email',
    accessor: 'email',
    disableFilters: true,
  },
  {
    accessor: 'actions',
    Cell: ({row}) => {
      return <UserRoleMoreMenu id={row.values.id} />
    },
    style: {
      textAlign: 'right',
    },
  },
  // {
  //   Header: 'Name',
  //   accessor: 'name',
  //   style: {
  //     padding: '0',
  //   },
  //   Cell: ({row}) => {
  //     return (
  //       <Stack direction="row" alignItems="center" spacing={2}>
  //         <Avatar alt={row.original.name} src={row.original.avatarUrl} />
  //         <Typography variant="subtitle2" noWrap>
  //           {row.original.name}
  //         </Typography>
  //       </Stack>
  //     )
  //   },
  // },
  // {
  //   Header: 'Company',
  //   accessor: 'company',
  // },
  // {
  //   Header: 'Role',
  //   accessor: 'role',
  // },
  // {
  //   Header: 'Verified',
  //   accessor: 'isVerified',
  //   Cell: ({row}) => {
  //     return row.original.isVerified ? 'Yes' : 'No'
  //   },
  // },
  // {
  //   Header: 'Status',
  //   accessor: 'status',
  //   Cell: ({row}) => {
  //     return (
  //       <Label
  //         variant="ghost"
  //         color={(row.original.status === 'banned' && 'error') || 'success'}
  //       >
  //         {sentenceCase(row.original.status)}
  //       </Label>
  //     )
  //   },
  // },
]
