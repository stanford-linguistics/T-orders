import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Container,
  Modal,
  Button,
  Table,
  Image,
  Tabs,
  Tab
} from 'react-bootstrap';
import TorderFormContainer from '../../containers/torderFormContainer';
import { updateTorder, deleteTorder } from '../../modules/dataService/torders';
import MyTorderTable from '../myTordersTable';
import QuestionTooltip from '../questionTooltip';

class MyTorders extends Component {
  constructor(props, context) {
    super(props, context);

    this.removeTorder = this.removeTorder.bind(this);
    this.viewTorder = this.viewTorder.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getExpirationDate = this.getExpirationDate.bind(this);

    this.state = {
      resultsPoller: null,
      showModal: false,
      torder: {
        params: {}
      }
    };
  }

  componentDidMount() {
    this.updateAll();
    this.startPolling();
  }

  updateAll = () => {
    var that = this;
    if (this.props.torders.length > 0) {
      that.props.torders.forEach(function(torder) {
        that.props.updateTorder(torder.id);
      });
    }
  };

  startPolling = () => {
    var resultsPoller = setInterval(this.requestResults, 5000);
    this.setState({ resultsPoller: resultsPoller });
  };

  requestResults = () => {
    var that = this;
    if (this.props.torders.length > 0) {
      that.props.torders.forEach(function(torder) {
        if (shouldUpdate(torder)) {
          that.props.updateTorder(torder.id);
        }
        if (
          torder.status === 'EXPIRED' &&
          that.props.shouldDeleteExpiredTorders
        ) {
          that.props.deleteTorder(torder.id);
        }
      });
    }
    function shouldUpdate(torder) {
      if (torder.status === 'SUCCESS') {
        var utcSeconds = torder.expiresOn;
        var d = new Date(0); // sets the date to the epoch
        d.setUTCSeconds(utcSeconds);

        var today = new Date();
        if (today >= d) {
          return true;
        }
      }
      return torder.status === 'PENDING' || torder.status === 'RUNNING';
    }
  };

  componentWillUnmount() {
    this.clearPoller();
  }

  clearPoller = () => {
    var poller = this.state.resultsPoller;
    var that = this;
    if (poller) {
      clearInterval(poller);
      that.setState({ resultsPoller: null });
    }
  };

  removeTorder = torder => {
    this.props.deleteTorder(torder.id);
  };

  viewTorder = torder => {
    this.setState({
      torder: Object.assign({}, this.state.torder, torder)
    });
    this.toggleModal();
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  getExpirationDate = () => {
    var utcSeconds = this.state.torder.expiresOn;
    var d = new Date(0); //sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    return d;
  };

  render() {
    return (
      <Container id="torder-mytorders-container">
        <h1>Compute T-orders</h1>
        <p>
          Upload your grammar spreadsheet and get CoGeTo to start computing by
          clicking on the 'compute' button below.{' '}
        </p>
        <p>
          {' '}
          The excel spreadsheet should list inputs, candidates, and constraint
          violations, in the usual format assumed by scripts for computational
          constraint-based phonology.{' '}
        </p>{' '}
        <p>
          {' '}
          Download the{' '}
          <a href={process.env.PUBLIC_URL + '/sample.xls'} download>
            example grammar spreadsheet
          </a>{' '}
          to view the proper formatting.{' '}
        </p>{' '}
        <p>
          {' '}
          Change CoGeTo's configuration parameters by clicking "Optional
          Configuration" when uploading the file.
        </p>
        <Container>
          {this.props.torders.length > 0 && (
            <Container fluid id="torder-mytorders-inner-container">
              <p>
                These are your recent T-orders. Please note that T-orders will
                expire after three days.{' '}
                <QuestionTooltip title="T-order Expiration">
                  <em>Expired t-orders are not able to be downloaded.</em>
                  <br />
                  T-orders that are expired can be set to be automatically
                  deleted in the settings.
                </QuestionTooltip>
              </p>
              <TorderFormContainer />
              <MyTorderTable
                torders={this.props.torders}
                removeTorder={this.removeTorder}
                viewTorder={this.viewTorder}
              />
            </Container>
          )}
          {this.props.torders <= 0 && (
            <Container>
              <p>
                You do not have any recent T-orders. Click the button below to
                get started.
              </p>
              <TorderFormContainer />
            </Container>
          )}
        </Container>
        <Modal
          show={this.state.showModal}
          onHide={this.toggleModal}
          keyboard={false}
          backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Details - {this.state.torder.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.torder.status === 'FAILURE' && (
              <div>
                <h1>Status: {this.state.torder.status}</h1>
                <p>{this.state.torder.errorMessage}</p>
              </div>
            )}
            {this.state.torder.status === 'SUCCESS' && (
              <Tabs defaultActiveKey="params">
                <Tab eventKey="params" title="Params">
                  <Table responsive striped bordered hover>
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Optimization method</strong>
                        </td>
                        <td>{this.state.torder.params.optimizationMethod}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Bound on number of candidates</strong>
                        </td>
                        <td>
                          {this.state.torder.params.boundOnNumberOfCandidates}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Number of trials</strong>
                        </td>
                        <td>{this.state.torder.params.numTrials}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Weight bound</strong>
                        </td>
                        <td>{this.state.torder.params.weightBound}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Hg feasible mappings only</strong>
                        </td>
                        <td>
                          {String(
                            this.state.torder.params.hgFeasibleMappingsOnly
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Display arrows</strong>
                        </td>
                        <td>
                          {String(this.state.torder.params.includeArrows)}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="graphs" title="Graphs">
                  <div>
                    {this.state.torder.images.map((image, index) => (
                      <div key={index}>
                        <h3>{image.name}</h3>
                        <Image src={image.url} fluid />
                      </div>
                    ))}
                  </div>
                </Tab>
                <Tab eventKey="notes" title="Notes" />
              </Tabs>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button className="torder-primary-btn" onClick={this.toggleModal}>
              close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = ({ torders, settings }) => ({
  torders: torders.torders,
  shouldDeleteExpiredTorders: settings.deleteExpiredTorders
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateTorder, deleteTorder }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTorders);
