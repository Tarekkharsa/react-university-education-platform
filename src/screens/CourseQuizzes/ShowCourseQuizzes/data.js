import CourseQuizMoreMenu from 'sections/@dashboard/courses/CourseQuizMoreMenu'

export const tableHiddenColumns = ['coursemodule']
export const tableColumns = [
  {
    Header: 'ID',
    accessor: 'coursemodule',
    disableFilters: true,
  },
  {
    Header: 'name',
    accessor: 'name',
    disableFilters: true,
  },
  // {
  //   Header: 'section',
  //   accessor: 'section',
  //   disableFilters: true,
  // },
  {
    Header: 'actions',
    accessor: 'actions',
    Cell: ({row}) => {
      return <CourseQuizMoreMenu id={row.original.id} />
    },
    style: {
      textAlign: 'right',
    },
  },
]
