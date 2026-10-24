# Changelog

## 0.4.3

No changes detected.

## 0.4.2

* `SDK.keyUsage.record()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.accounts.delete()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.assessments.create()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.assessments.delete()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.assessments.recordOutcome()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.integrations.create()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.keys.rotate()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.replayDelivery()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.listDeliveries()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.integrations.list()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.integrations.delete()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.integrations.rotate()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.list()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.create()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.delete()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.rotateSigningKey()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.sendTestEvent()`:  `response.code.enum(risk_version_ahead)` **Added** (Breaking ⚠️)
* `SDK.accounts.listChanged()`: **Added**
* `SDK.accounts.recordEnforcement()`: **Added**

## 0.4.1

No changes detected.

## 0.4.0

No changes detected.

## 0.3.5

* `SDK.assessments.create()`:  `response.account.risk_version` **Added**
* `SDK.assessments.get()`:  `response.account.risk_version` **Added**
* `SDK.accounts.get()`:  `response.risk_version` **Added**

## 0.3.4

No changes detected.

## 0.3.3

* `SDK.keys.rotate()`:  `response.scopes[].enum(delete)` **Added** (Breaking ⚠️)

## 0.3.2

No changes detected.

## 0.3.1

No changes detected.

## 0.3.0

* `SDK.assessments.create()`: 
  *  `request.body.flow` **Changed** (Breaking ⚠️)
  *  `response` **Changed** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.assessments.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.recordOutcome()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.accounts.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.keyUsage.record()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keys.rotate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.rotate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.rotateSigningKey()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.sendTestEvent()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.listDeliveries()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.replayDelivery()`:  `response.code` **Changed** (Breaking ⚠️)

## 0.2.11

No changes detected.

## 0.2.10

* `SDK.webhookEndpoints.listDeliveries()`:  `response.items[].event_type` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.replayDelivery()`:  `response.event_type` **Changed** (Breaking ⚠️)

## 0.2.9

No changes detected.

## 0.2.8

No changes detected.

## 0.2.7

No changes detected.

## 0.2.6

No changes detected.

## 0.2.5

No changes detected.

## 0.2.4

* `SDK.assessments.create()`:  `response.account.risk.reasons[].code.enum(shared_api_key)` **Added** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.account.risk.reasons[].code.enum(shared_api_key)` **Added** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.items[].risk.reasons[].code.enum(shared_api_key)` **Added** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.risk.reasons[].code.enum(shared_api_key)` **Added** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.items[].risk.reasons[].code.enum(shared_api_key)` **Added** (Breaking ⚠️)
* `SDK.keyUsage.record()`: **Added**

## 0.2.3

No changes detected.

## 0.2.2

No changes detected.

## 0.2.1

No changes detected.

## 0.2.0

* `SDK.assessments.create()`: 
  *  `request.body` **Changed** (Breaking ⚠️)
  *  `response` **Changed** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response` **Changed** (Breaking ⚠️)

## 0.1.39

* `SDK.assessments.delete()`: **Added**

## 0.1.38

No changes detected.

## 0.1.37

No changes detected.

## 0.1.36

No changes detected.

## 0.1.35

* `SDK.accounts.delete()`: **Added**

## 0.1.34

* `SDK.assessments.create()`: 
  *  `request.body` **Changed**

## 0.1.33

No changes detected.

## 0.1.32

* `SDK.webhookEndpoints.listDeliveries()`: **Added**
* `SDK.webhookEndpoints.replayDelivery()`: **Added**

## 0.1.31

No changes detected.

## 0.1.30

No changes detected.

## 0.1.29

No changes detected.

## 0.1.28

* `SDK.assessments.create()`:  `response.risk.reasons[].code.enum(test_scenario)` **Added** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.risk.reasons[].code.enum(test_scenario)` **Added** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.items[].risk.reasons[].code.enum(test_scenario)` **Added** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.risk.reasons[].code.enum(test_scenario)` **Added** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.items[].risk.reasons[].code.enum(test_scenario)` **Added** (Breaking ⚠️)

## 0.1.27

No changes detected.

## 0.1.26

No changes detected.

## 0.1.25

No changes detected.

## 0.1.24

No changes detected.

## 0.1.23

No changes detected.

## 0.1.22

No changes detected.

## 0.1.21

* `SDK.accounts.get()`: **Added**
* `SDK.accounts.listAssessments()`: **Added**

## 0.1.20

No changes detected.

## 0.1.19

No changes detected.

## 0.1.18

No changes detected.

## 0.1.17

No changes detected.

## 0.1.16

No changes detected.

## 0.1.15

No changes detected.

## 0.1.14

No changes detected.

## 0.1.13

No changes detected.

## 0.1.12

* `SDK.assessments.create()`:  `response.auth_context` **Added**
* `SDK.assessments.get()`:  `response.auth_context` **Added**
* `SDK.assessments.query()`:  `response.items[].auth_context` **Added**

## 0.1.11

No changes detected.

## 0.1.10

No changes detected.

## 0.1.9

No changes detected.

## 0.1.8

No changes detected.

## 0.1.7

* `SDK.keys.rotate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.rotate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.recordOutcome()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.list()`: **Added**
* `SDK.webhookEndpoints.create()`: **Added**
* `SDK.webhookEndpoints.sendTestEvent()`: **Added**
* `SDK.webhookEndpoints.rotateSigningKey()`: **Added**
* `SDK.webhookEndpoints.delete()`: **Added**

## 0.1.6

* `SDK.assessments.create()`:  `response.code.enum(too_many_integrations)` **Added** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.code.enum(too_many_integrations)` **Added** (Breaking ⚠️)
* `SDK.assessments.recordOutcome()`:  `response.code.enum(too_many_integrations)` **Added** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.code.enum(too_many_integrations)` **Added** (Breaking ⚠️)
* `SDK.keys.rotate()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.integrations.create()`: **Added**
* `SDK.integrations.list()`: **Added**
* `SDK.integrations.delete()`: **Added**
* `SDK.integrations.rotate()`: **Added**

## 0.1.5

* `SDK.assessments.create()`: 
  *  `request.body.issued_credential` **Added**
  *  `response.risk` **Changed**
* `SDK.assessments.get()`:  `response.risk` **Changed**
* `SDK.assessments.query()`:  `response.items[].risk` **Changed**

## 0.1.4

No changes detected.

## 0.1.3

No changes detected.

## 0.1.2

* `SDK.assessments.create()`: 
  *  `request.body.auth_context` **Changed**

## 0.1.1

No changes detected.

## 0.1.0

API changes since the previous release are not listed: no earlier document was recorded.
