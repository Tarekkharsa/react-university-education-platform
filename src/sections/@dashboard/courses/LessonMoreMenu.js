import {useRef, useState} from 'react'
import {Link as RouterLink, useNavigate} from 'react-router-dom'
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
// component
import Iconify from '../../../components/Iconify'
import {FormattedMessage} from 'react-intl'

// ----------------------------------------------------------------------

export default function LessonMoreMenu({
  row,
  setOpen,
  setOpenShowModla,
  setLesson,
}) {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => {
          setIsOpen(false)
        }}
        PaperProps={{
          sx: {width: 200, maxWidth: '100%'},
        }}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        <MenuItem
          sx={{color: 'text.secondary'}}
          onClick={() => navigate(`lessons/${row.id}/show`)}
        >
          <ListItemIcon>
            <Iconify icon="carbon:view" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={<FormattedMessage id="show" />}
            primaryTypographyProps={{variant: 'body2'}}
          />
        </MenuItem>
        <MenuItem
          sx={{color: 'text.secondary'}}
          onClick={() => {
            setLesson(row)
            setOpen(true)
          }}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={<FormattedMessage id="edit" />}
            primaryTypographyProps={{variant: 'body2'}}
          />
        </MenuItem>
      </Menu>
    </>
  )
}
