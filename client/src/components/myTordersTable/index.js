import React from 'react';
import { Button, Container, Table, Row, Col } from 'react-bootstrap';
import { BarLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faTrashAlt,
  faListAlt
} from '@fortawesome/free-solid-svg-icons';
import TorderFormContainer from '../../containers/torderFormContainer';
import Moment from 'react-moment';
import 'moment-timezone';

function MyTorderTable(props) {
  return (
    <Container>
      <TorderFormContainer />
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Expires</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.torders.map((torder, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{torder.name}</td>
              <td>
                {torder.status}
                <BarLoader
                  sizeUnit={'px'}
                  size={20}
                  color={'#226657'}
                  loading={
                    torder.status === 'RUNNING' || torder.status === 'PENDING'
                  }
                />
              </td>
              <td>
                {torder.expiresOn && (
                  <Moment
                    interval={10000}
                    to={new Date(0).setUTCSeconds(torder.expiresOn)}
                  />
                )}
              </td>
              <td>
                <Container>
                  <Row>
                    <Col>
                      {torder.status === 'SUCCESS' && (
                        <div>
                          <a
                            className="btn torder-compute-btn"
                            role="button"
                            href={torder.link}
                            download>
                            <FontAwesomeIcon icon={faDownload} />
                          </a>
                        </div>
                      )}
                      {torder.status !== 'SUCCESS' && (
                        <Button className="torder-compute-btn" disabled>
                          <FontAwesomeIcon icon={faDownload} />
                        </Button>
                      )}
                    </Col>
                    <Col>
                      <Button
                        className="torder-compute-btn"
                        value={torder}
                        onClick={() => props.viewTorder(torder)}>
                        <FontAwesomeIcon icon={faListAlt} />
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className="torder-compute-btn"
                        value={torder}
                        onClick={() => props.removeTorder(torder)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default MyTorderTable;
