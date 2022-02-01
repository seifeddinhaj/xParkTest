import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addVehicle,
  deleteStates,
  deleteVehicle,
  loadVehicles,
  modifyState,
  modifyVehicle,
} from './action'
import { Button, Card, Modal, Table } from 'react-bootstrap'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { loadStates } from '../../States/action'
import { ToastContainer } from 'react-toastify';

const Vehicles = () => {
  const dispatch = useDispatch()
  const states = useSelector((state) => state.StateReducer.states)
  const vehicles = useSelector((state) => state.VehicleReducer.vehicles)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [name, setName] = useState('')
  const [stateID, setStateID] = useState('')
  const [edit, setEdit] = useState()
  const [editedName, setEditedName] = useState()
  const [editedState, setEditedState] = useState()

  const handleName = (e) => setName(e?.target?.value)
  const rendredStateOptions = () => {
    return states.map((state) => <option key={state?.id} value={state?.id}>{state.name}</option>)
  }

  const handleaddVehicles = () => {
    dispatch(
      addVehicle({
        vehicle: {
          name: name,
          current_state_id: stateID,
        },
      }),
    )
  }
  useEffect(() => {
    dispatch(loadStates())
    dispatch(loadVehicles())
  }, [])
  useEffect(() => {
    console.log('--->', stateID, name, edit)
  }, [stateID, name, edit])

  const rendredModalBody = (val) => {
    return (
      <CForm>
        <CInputGroup className="mb-4">
          <CFormInput
            type="text"
            placeholder="name"
            value={editedName}
            onChange={(e) => setEditedName(e?.target?.value)}
          />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CFormSelect
            size="lg"
            className="mb-3"
            value={editedState}
            onChange={(e) => setEditedState(e?.target?.value)}
          >
            <option disabled={true}>select a state</option>
            {rendredStateOptions()}
          </CFormSelect>
        </CInputGroup>
        <div className=" text-center">
          <CButton
            className="btn-dark w-50"
            onClick={() => {
              dispatch(
                modifyVehicle(
                  {
                    vehicle: {
                      name: editedName,
                      current_state_id: editedState,
                    },
                  },
                  val?.id,
                ),
                setShow(false),
              )
            }}
          >
            edit
          </CButton>
        </div>
      </CForm>
    )
  }

  return (
    <>
      <Card>
        <ToastContainer
        hideProgressBar/>
        <Card.Header>add vehicle</Card.Header>
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
                        <CFormSelect
                          size="lg"
                          className="mb-3"
                          onChange={(e) => setStateID(e?.target?.value)}
                        >
                          <option disabled={true}>select a state</option>
                          {rendredStateOptions()}
                        </CFormSelect>
                      </CInputGroup>
                      <div className=" text-center">
                        <CButton disabled={!name} className="btn-success w-50" onClick={handleaddVehicles}>
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
            <th>user id</th>
            <th>position</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index}>
              <td>{vehicle?.id}</td>
              <td>{vehicle?.name}</td>
              <td>{vehicle?.user_id}</td>
              <td>{vehicle?.current_state?.name ?? '*********'}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => {
                    setEdit(vehicle)
                    setEditedName(vehicle?.name)
                    setEditedState(vehicle?.current_state_id)
                    setShow(true)
                  }}
                >
                  edit
                </Button>
                <Button variant="danger" onClick={() => dispatch(deleteVehicle(vehicle?.id))}>
                  delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>{rendredModalBody(edit)}</Modal.Body>
      </Modal>
    </>
  )
}

export default Vehicles
