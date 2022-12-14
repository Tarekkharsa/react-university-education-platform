import {Button, Container, Stack} from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import Iconify from 'components/Iconify'
import Page from 'components/Page'
import useRoles from 'hooks/useRoles'
import PropTypes from 'prop-types'
import * as React from 'react'
import {FormattedMessage} from 'react-intl'
import {Link as RouterLink, useParams} from 'react-router-dom'
import CourseUsers from '../Partials/CourseUsers'
import Lessons from '../Partials/Lessons'
import ManageCalendar from '../Partials/ManageCalendar'
import ShowCourse from './showCourseDetails'

function TabPanel(props) {
  const {children, value, index, ...other} = props

  return (
    <div
      style={{width: '100%'}}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0)
  const {id} = useParams()
  const {checkIfRolesInUserRoles} = useRoles()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Page title="Course">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="course_details" />
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to={`/dashboard/manage-courses/${id}/edit`}
            startIcon={<Iconify icon="eva:edit-fill" />}
          >
            <FormattedMessage id="edit_course" />
          </Button>
        </Stack>
        <Box sx={{width: '100%'}}>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label={<FormattedMessage id="course_info" />}
                {...a11yProps(0)}
              />
              <Tab
                label={<FormattedMessage id="lessons" />}
                {...a11yProps(1)}
              />
              <Tab label={<FormattedMessage id="users" />} {...a11yProps(2)} />
              {!checkIfRolesInUserRoles(['ROLE_ADMIN']) && (
                <Tab
                  label={<FormattedMessage id="calendar" />}
                  {...a11yProps(3)}
                />
              )}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ShowCourse />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Lessons />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CourseUsers />
          </TabPanel>
          {!checkIfRolesInUserRoles(['ROLE_ADMIN']) && (
            <TabPanel value={value} index={3}>
              <ManageCalendar />
            </TabPanel>
          )}
        </Box>
      </Container>
    </Page>
  )
}
