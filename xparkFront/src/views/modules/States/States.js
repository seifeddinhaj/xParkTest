import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addState, deleteStates, loadStates, modifyState } from './action'
import { Button, Card, Modal, Table } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';

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

const EditState = (props) => {
  useEffect(() => {
    console.log(props)
  })

  const [name, setName] = useState(props?.state?.name)
  const [position, setPosition] = useState(props?.state?.position)

  return (
    <CForm>
      <CInputGroup className="mb-4">
        <CFormInput
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </CInputGroup>
      <CInputGroup className="mb-3">
        <CFormInput
          placeholder="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          type='number'
        />
      </CInputGroup>
      <div className=" text-center">
        <CButton
          className="btn-dark w-50"
          onClick={() =>
            
            props.handleUpdate(
              {
                state: {
                  name,
                  position,
                },
              },
              
              props.state?.id,
            )
          }
        >
          edit
        </CButton>
      </div>
    </CForm>
  )
}

const States = () => {
  const dispatch = useDispatch()
  const states = useSelector((state) => state.StateReducer.states)
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [show, setShow] = useState(false)
  const [stateToEdit, setStateToEdit] = useState()
  const handleClose = () => setShow(false)
  const handleName = (e) => setName(e?.target?.value)
  const handlePosition = (e) => setPosition(e?.target?.value)
  const handleUpdate = (value, id) => {
    dispatch(modifyState(value, id))
    handleClose()
  }

  useEffect(() => {
    dispatch(loadStates())
  }, [])
  useEffect(() => {
    console.log(states)
  }, [])

  return (
    <>
      <Card>
        <ToastContainer
        hideProgressBar/>
        <Card.Header>add state</Card.Header>
        <Card.Body>
          {' '}
          <CRow className="justify-content-center">
            <CCol lg={10}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          type="text"
                          placeholder="name"
                          onChange={(e) => handleName(e)}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CFormInput placeholder="position" onChange={(e) => handlePosition(e)} type='number' />
                      </CInputGroup>
                      <div className=" text-center">
                        <CButton
                          disabled={!name}
                          className="btn-success w-50"
                          onClick={() => dispatch(addState({ state: { name, position } }))}
                        >
                          add
                        </CButton>
                      </div>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </Card.Body>
      </Card>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>position</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {states.map((state, index) => (
            <tr key={index}>
              <td>{state?.id}</td>
              <td>{state?.name}</td>
              <td>{state?.position}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => {
                    setStateToEdit(state)
                    setShow(true)
                  }}
                >
                  edit
                </Button>
                <Button variant="danger" onClick={() => dispatch(deleteStates(state?.id))}>
                  delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit State</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditState state={stateToEdit} handleUpdate={handleUpdate} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default States
