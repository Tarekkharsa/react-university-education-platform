import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from '@mui/material'
import Iconify from 'components/Iconify'
import {FullPageSpinner} from 'components/lib'
import Page from 'components/Page'
import {useClient} from 'context/auth-context'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {FormattedMessage} from 'react-intl'
import {useQuery} from 'react-query'
import {Link as RouterLink, useParams} from 'react-router-dom'
import useStyles from './styles'

export default function ShowQuizDetails() {
  const classes = useStyles()
  const {course_id, quiz_id} = useParams()
  const client = useClient()
  const {isLoading, error, data} = useQuery({
    queryKey: 'course',
    queryFn: () =>
      client(
        `module/quiz/getCourseQuizById?course_id=${course_id}&quiz_id=${quiz_id}`,
      ).then(data => data.data[0]),
  })

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <List className={classes.root}>
      <ListItem button className={classes.li}>
        <ListItemIcon>
          <FormattedMessage id="name" />
        </ListItemIcon>
        <div>{data?.name}</div>
      </ListItem>
      <Divider variant="inset" component="li" />

      <ListItem button className={classes.descLi}>
        <ListItemIcon>
          <FormattedMessage id="description" />
        </ListItemIcon>
        <div>{data?.intro}</div>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  )
}
