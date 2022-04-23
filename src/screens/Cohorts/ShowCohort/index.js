import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Stack,
} from '@mui/material'
import {Link as RouterLink, useParams} from 'react-router-dom'
import Iconify from 'components/Iconify'
import Page from 'components/Page'
import ShowCohort from './showCohortDetails'
import Members from '../Partials/Members'

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

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Page title="Cohort">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Cohort Details
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to={`/dashboard/cohorts/${id}/edit`}
            startIcon={<Iconify icon="eva:edit-fill" />}
          >
            Edit Cohort
          </Button>
        </Stack>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{borderRight: 1, borderColor: 'divider'}}
          >
            <Tab label="Cohort Info" {...a11yProps(0)} />
            <Tab label="Members" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ShowCohort />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Members />
          </TabPanel>
        </Box>
      </Container>
    </Page>
  )
}
