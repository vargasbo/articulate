import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';
import { Grid, Button, Hidden, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import TrainButton from 'components/TrainButton';

import messages from '../messages';

const styles = {
    container: {
        display: 'inline',
    },
    actionContainer: {
        display: 'inline',
        float: 'right'
    },
    buttonContainer: {
        position: 'relative',
        bottom: '5px'
    },
    icon: {
        padding: '0px 10px',
        cursor: 'pointer'
    },
    link: {
        color: '#4e4e4e',
        textDecoration: 'none'
    },
    button: {
        display: 'inline'
    },
}

/* eslint-disable react/prefer-stateless-function */
class ActionButtons extends React.Component {

    render(){
        const { classes, agentStatus, lastTraining, onTrain } = this.props;
        return (
            <Grid className={classes.container}>
                <TrainButton
                    agentStatus={agentStatus}
                    lastTraining={lastTraining}
                    onTrain={onTrain}
                />
                <Grid item className={classes.actionContainer}>
                    <Hidden only={['xl', 'lg', 'md']}>
                        <Link className={`${classes.icon} ${classes.link}`} to='/'>
                            <Icon>arrow_back</Icon>
                        </Link>
                        <a onClick={this.props.onFinishAction} className={`${classes.icon} ${classes.link}`}>
                            <Icon>save</Icon>
                        </a>
                    </Hidden>
                    <Hidden only={['sm', 'xs']}>
                        <Grid className={classes.buttonContainer}>
                            <Button key='btnCancel'>
                                <Link className={classes.link} to='/'>
                                    <FormattedMessage {...messages.cancelButton} />
                                </Link>
                            </Button>
                            <Button style={{color: this.props.formError ? '#f44336' : ''}} onClick={this.props.onFinishAction} key='btnFinish' variant='raised'>
                                <FormattedMessage {...messages.finishButton} />
                            </Button>
                        </Grid>
                    </Hidden>
                </Grid>
            </Grid>
        );
    }
}

ActionButtons.propTypes = {
    classes: PropTypes.object.isRequired,
    onFinishAction: PropTypes.func.isRequired,
    onTrain: PropTypes.func,
    agentStatus: PropTypes.string,
    lastTraining: PropTypes.string,
    formError: PropTypes.bool,
};

export default withStyles(styles)(ActionButtons);