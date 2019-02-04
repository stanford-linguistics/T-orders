import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { BarLoader } from 'react-spinners';
import TorderModal from '../torderModal';

class MyTorders extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      //torders: []
      torders: [
        {
          name: 'CV without complex margins',
          description: 'This T-order does not have complex margins.',
          status: 'Pending'
        },
        {
          name: 'CV WITH hbcs',
          description: 'A T-order with hbcs.',
          status: 'Completed'
        },
        {
          name: 'Violations.xls',
          description: null,
          status: 'Failed'
        }
      ]
    };
  }

  render() {
    return (
      <Container className="torder-docs">
        <div id="my-torders" className="torder-my-torder">
          <h2>My T-orders</h2>
          <TorderModal />
          <Table responsive striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.torders.map((torder, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{torder.name}</td>
                  <td>{torder.description}</td>
                  <td>
                    {torder.status}
                    <BarLoader
                      sizeUnit={'px'}
                      size={20}
                      color={'#226657'}
                      loading={torder.status === 'Pending'}
                    />
                  </td>
                  <td />
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    );
  }
}

export default MyTorders;
