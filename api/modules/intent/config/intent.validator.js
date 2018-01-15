'use strict';

const Joi = require('joi');
const IntentSchema = require('../../../models/index').Intent.schema;
const ScenarioSchema = require('../../../models/index').Scenario.schema;
const SlotSchema = require('../../../models/index').Slot.schema;

class IntentValidate {
    constructor() {

        this.add = {
            payload: (() => {

                return {
                    agent: IntentSchema.agent.required().error(new Error('The agent is required. Please specify an agent for the intent.')),
                    domain: IntentSchema.domain.required().error(new Error('The domain is required. Please specify a domain for the intent')),
                    intentName: IntentSchema.intentName.required().error(new Error('The intent name is required')),
                    examples: IntentSchema.examples.required().min(2).error(new Error('Please enter at least 2 user sayings.'))
                };
            })()
        };

        this.findById = {
            params: (() => {

                return {
                    id: IntentSchema.id.required().description('Id of the intent')
                };
            })()
        };

        this.updateById = {
            params: (() => {

                return {
                    id: IntentSchema.id.required().description('Id of the intent')
                };
            })(),
            payload: (() => {

                return {
                    intentName: IntentSchema.intentName,
                    examples: IntentSchema.examples.min(2).error(new Error('Please enter at least 2 user sayings.'))
                };
            })()
        };

        this.deleteById = {
            params: (() => {

                return {
                    id: IntentSchema.id.required().description('Id of the intent')
                };
            })()
        };

        this.addScenario = {
            params: (() => {

                return {
                    id: IntentSchema.id.required().description('Id of the intent')
                };
            })(),
            payload: (() => {

                return {
                    agent: ScenarioSchema.agent.required().error(new Error('The agent is required. Please specify an agent for the scenario.')),
                    domain: ScenarioSchema.domain.required().error(new Error('The domain is required. Please specify a domain for the scenario.')),
                    intent: ScenarioSchema.intent.required().error(new Error('The intent is required. Please specify an intent for the scenario.')),
                    scenarioName: ScenarioSchema.scenarioName.required().error(new Error('The name is required. Please specify a name for the scenario.')),
                    slots: Joi.array().items({
                        slotName: SlotSchema.slotName.required().error(new Error('The slot name is required.')),
                        entity: SlotSchema.entity.required().error(new Error('The entity is required for the slot.')),
                        isList: SlotSchema.isList.required().error(new Error('Please specify if the slot is a list of items or not.')),
                        isRequired: SlotSchema.isRequired.required().error(new Error('Please specify if the slot is required or not.')),
                        textPrompts: SlotSchema.textPrompts,
                        useWebhook: SlotSchema.useWebhook.required().error(new Error('Please specify if the slot use a webhook or not.'))
                    }),
                    intentResponses: ScenarioSchema.intentResponses.required().min(1).error(new Error('Please specify at least one response from the agent for this scenario.')),
                    useWebhook: ScenarioSchema.useWebhook.required().error(new Error('Please specify if these scenario use a webhook for fullfilment.')),
                    webhookUrl: ScenarioSchema.webhookUrl
                };
            })()
        };

        this.findScenario = {
            params: (() => {

                return {
                    id: IntentSchema.id.required().description('Id of the intent')
                };
            })()
        };

        this.updateScenario = {
            params: (() => {

                return {
                    id: IntentSchema.id.required().description('Id of the intent')
                };
            })(),
            payload: (() => {

                return {
                    scenarioName: ScenarioSchema.scenarioName,
                    slots: Joi.array().items({
                        slotName: SlotSchema.slotName.required(),
                        entity: SlotSchema.entity.required(),
                        isList: SlotSchema.isList.required(),
                        isRequired: SlotSchema.isRequired.required(),
                        textPrompts: SlotSchema.textPrompts,
                        useWebhook: SlotSchema.useWebhook.required()
                    }),
                    intentResponses: ScenarioSchema.intentResponses,
                    useWebhook: ScenarioSchema.useWebhook,
                    webhookUrl: ScenarioSchema.webhookUrl
                };
            })()
        };

        this.deleteScenario = {
            params: (() => {

                return {
                    id: IntentSchema.id.required().description('Id of the intent')
                };
            })()
        };

    }
}

const intentValidate = new IntentValidate();
module.exports = intentValidate;