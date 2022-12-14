import PropTypes from 'prop-types'
import {Link as RouterLink} from 'react-router-dom'
// material
import {Box, Card, Link, Typography, Stack, IconButton} from '@mui/material'
import {styled} from '@mui/material/styles'
// utils
import {fCurrency} from '../../../utils/formatNumber'
//
import Label from '../../../components/Label'
import ColorPreview from '../../../components/ColorPreview'
import {mockImgCourse} from 'utils/mockImages'
import Iconify from 'components/Iconify'
import {useMutation, useQuery} from 'react-query'
import {useClient} from 'context/auth-context'
import {useState} from 'react'

// ----------------------------------------------------------------------

const CourseImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
})

// ----------------------------------------------------------------------

CourseCard.propTypes = {
  product: PropTypes.object,
}

export default function CourseCard({course}) {
  const [favorite, setFavorite] = useState(false)
  const {fullname, cover, active, category, id} = course
  const client = useClient()

  const {
    isLoading: isLoadingFavCourses,
    error: errorFavCourses,
    data: favCourses,
  } = useQuery({
    queryKey: 'FavCourses',
    queryFn: () =>
      client(`course/feature/getFavCourses`).then(data => {
        let newDate = data?.data?.filter(item => item.id === id)
        if (newDate?.length > 0) {
          setFavorite(true)
        }
        return data?.data
      }),
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client('course/feature/addCourseToFav', {
        method: 'POST',
        data: {course_id: id},
      }),
    {
      onSuccess: data => {
        setFavorite(true)
      },
    },
  )
  return (
    <Card>
      <Box sx={{pt: '100%', position: 'relative'}}>
        {active && (
          <Label
            variant="filled"
            color={active ? 'info' : 'error'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {active ? 'Active' : 'Inactive'}
          </Label>
        )}
        <IconButton
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
          color={'error'}
          onClick={mutate}
        >
          {isLoadingFavCourses && <Iconify icon="carbon:loading" />}
          {favorite && !isLoadingFavCourses ? (
            <Iconify icon="carbon:favorite-filled" />
          ) : (
            <Iconify icon="carbon:favorite" />
          )}
        </IconButton>
        <CourseImgStyle
          alt={fullname}
          src={`/images/courses/ahmad_course.png`}
        />
      </Box>

      <Stack spacing={2} sx={{p: 3}}>
        <Link
          to={`${id}/show`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="subtitle2" noWrap>
            {fullname}
          </Typography>
        </Link>
      </Stack>
    </Card>
  )
}
