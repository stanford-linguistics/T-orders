import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { computeTorder } from '../../modules/dataService/torders';
import TorderForm from '../../components/torderForm';
import TorderModal from '../../components/torderModal';

class TorderFormContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.submitTorderRequest = this.submitTorderRequest.bind(this);
    this.addFile = this.addFile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.shouldDisableSubmit = this.shouldDisableSubmit.bind(this);

    this.state = {
      showModal: false,
      validated: false,
      name: '',
      inputFile: null,
      optimizationMethod: this.props.preferredSettings.optimizationMethod,
      candidatesBound: this.props.preferredSettings.boundOnNumberOfCandidates,
      numTrials: this.props.preferredSettings.numTrials,
      weightBound: this.props.preferredSettings.weightBound,
      hgMappingsOnly: this.props.preferredSettings.hgFeasibleMappingsOnly,
      displayArrows: this.props.preferredSettings.includeArrows
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addFile = event => {
    this.setState({ inputFile: event.target.files[0] });
  };

  submitTorderRequest = event => {
    var config = {
      name: this.state.name,
      description: this.state.description,
      hgFeasibleMappingsOnly: this.state.hgMappingsOnly,
      optimizationMethod: this.state.optimizationMethod,
      boundOnNumberOfCandidates: Number(this.state.candidatesBound),
      numTrials: Number(this.state.numTrials),
      weightBound: Number(this.state.weightBound),
      includeArrows: this.state.displayArrows
    };
    this.props.computeTorder(this.state.inputFile, config);
    this.resetState();
    this.toggleModal();
    this.props.changePage('/my-t-orders');
  };

  resetState = () => {
    this.setState({
      name: '',
      inputFile: null,
      validated: false,
      optimizationMethod: this.props.preferredSettings.optimizationMethod,
      candidatesBound: this.props.preferredSettings.boundOnNumberOfCandidates,
      numTrials: this.props.preferredSettings.numTrials,
      weightBound: this.props.preferredSettings.weightBound,
      hgMappingsOnly: this.props.preferredSettings.hgFeasibleMappingsOnly,
      displayArrows: this.props.preferredSettings.includeArrows
    });
  };

  handleCheckBoxChanged = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  toggleModal() {
    if (!this.state.showModal) {
      this.resetState();
    }
    this.setState({ showModal: !this.state.showModal });
  }

  shouldDisableSubmit = () => {
    if (this.state.inputFile) {
      var extension = getExtension(this.state.inputFile.name);
      return extension.toLowerCase() !== 'xls';
    }
    return true;

    function getExtension(filename) {
      var parts = filename.split('.');
      return parts[parts.length - 1];
    }
  };

  render() {
    return (
      <TorderModal
        showModal={this.state.showModal}
        toggleModal={this.toggleModal}
        submitTorderRequest={this.submitTorderRequest}
        shouldDisableSubmit={this.shouldDisableSubmit}>
        <TorderForm
          preferredSettings={this.props.preferredSettings}
          validated={this.state.validated}
          addFile={this.addFile}
          handleInputChange={this.handleInputChange}
          optimizationMethod={this.state.optimizationMethod}
          candidatesBound={this.state.candidatesBound}
          numTrials={this.state.numTrials}
          weightBound={this.state.weightBound}
          hgMappingsOnly={this.state.hgMappingsOnly}
          displayArrows={this.state.displayArrows}
          handleCheckBoxChanged={this.handleCheckBoxChanged}
        />
      </TorderModal>
    );
  }
}

const mapStateToProps = ({ torders, settings }) => ({
  fileId: torders.fileId,
  preferredSettings: settings.preferredComputeSettings
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: page => push(page),
      computeTorder
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TorderFormContainer);
