import React from 'react'
import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from '../../assets/images/avatars/9.jpg'
import { useDispatch } from 'react-redux'
import { logout } from '../../views/pages/login/action'
import { useHistory } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const disptach = useDispatch()
  const history = useHistory()
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <CIcon icon={cilLockLocked} className="me-2" />
          <div
            onClick={() => {
              disptach(logout())
              history.push('/login')
            }}
          >
            Logout
          </div>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
