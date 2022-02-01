import React, { useEffect, useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilMap } from '@coreui/icons'
import swal from 'sweetalert'
import { login } from './action'
import { isAuthenticated } from '../../../service/AuthGuard'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/')
    }
  }, [])

  const handleChangePass = (e) => setPassword(e.target.value)
  const handleChangeMail = (e) => setMail(e.target.value)
  const handleLogin = async () => {
    await dispatch(login({ mail, password }))
    if (localStorage.getItem('token')) {
      history.push('/')
    } else swal('Bad Or Invalid credentials !', '', 'error')
  }

  return (
    <div className="bg-black bg-opacity-10 min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilMap} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="email"
                        autoComplete="email"
                        value={mail}
                        onChange={(e) => handleChangeMail(e)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => handleChangePass(e)}
                      />
                    </CInputGroup>
                    <div className=" text-center">
                      <CButton onClick={handleLogin} className="btn-primary w-50">
                        Login
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
