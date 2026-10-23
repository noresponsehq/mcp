# Changelog

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
