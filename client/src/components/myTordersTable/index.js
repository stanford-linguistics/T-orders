import React from 'react';
import { Button, Container, Table, Row, Col } from 'react-bootstrap';
import { BarLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faTrashAlt,
  faListAlt
} from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import 'moment-timezone';

function MyTorderTable(props) {
  return (
    <Container id="torder-mytorders-table-container" fluid>
      <Table id="torder-mytorders-table" responsive striped bordered hover>
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
                  color={'#8c1515'}
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
                            title="Download"
                            className="btn torder-primary-btn"
                            role="button"
                            href={torder.link}
                            download>
                            <FontAwesomeIcon icon={faDownload} />
                          </a>
                        </div>
                      )}
                      {torder.status !== 'SUCCESS' && (
                        <Button className="torder-primary-btn" disabled>
                          <FontAwesomeIcon icon={faDownload} />
                        </Button>
                      )}
                    </Col>
                    <Col>
                      <Button
                        title="View Details"
                        className="torder-primary-btn"
                        value={torder}
                        onClick={() => props.viewTorder(torder)}>
                        <FontAwesomeIcon icon={faListAlt} />
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        title="delete"
                        className="torder-primary-btn"
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
