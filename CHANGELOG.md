# Changelog

## 0.11.10

* `SDK.assessments.create()`:  `response.account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.assessments.aggregate()`: 
  *  `request.reason` **Changed**
  *  `response.buckets[].groups[].reason` **Changed** (Breaking ⚠️)
* `SDK.assessments.search()`: 
  *  `request.reason` **Changed**
  *  `response.items[].detail.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.assessments.retrieveVersion()`:  `response.detail.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.retrieveDecision()`:  `response.account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.export()`:  `response.assessments[].detail.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listDecisions()`:  `response.items[].account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.search()`:  `response.items[].latest.detail.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.requests.list()`:  `response.items[].decision.account.risk.reasons[].code` **Changed** (Breaking ⚠️)

## 0.11.9

* `SDK.assessments.create()`:  `response.detail.risk.details.breaches[].conduct` **Added**
* `SDK.assessments.get()`:  `response.detail.risk.details.breaches[].conduct` **Added**
* `SDK.assessments.query()`:  `response.items[].risk.details.breaches[].conduct` **Added**
* `SDK.assessments.search()`:  `response.items[].detail.risk.details.breaches[].conduct` **Added**
* `SDK.assessments.retrieveVersion()`:  `response.detail.risk.details.breaches[].conduct` **Added**
* `SDK.accounts.listAssessments()`:  `response.items[].risk.details.breaches[].conduct` **Added**
* `SDK.accounts.export()`:  `response.assessments[].detail.risk.details.breaches[].conduct` **Added**
* `SDK.accounts.search()`:  `response.items[].latest.detail.risk.details.breaches[].conduct` **Added**

## 0.11.8

* `SDK.assessments.create()`:  `response.detail.risk` **Changed**
* `SDK.assessments.get()`:  `response.detail.risk` **Changed**
* `SDK.assessments.query()`:  `response.items[].risk` **Changed**
* `SDK.assessments.search()`:  `response.items[].detail.risk` **Changed**
* `SDK.assessments.retrieveVersion()`:  `response.detail.risk` **Changed**
* `SDK.accounts.listAssessments()`:  `response.items[].risk` **Changed**
* `SDK.accounts.export()`:  `response.assessments[].detail.risk` **Changed**
* `SDK.accounts.search()`:  `response.items[].latest.detail.risk` **Changed**

## 0.11.7

No changes detected.

## 0.11.6

* `SDK.assessments.create()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.assessments.delete()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.assessments.recordOutcome()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.assessments.aggregate()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.assessments.search()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.assessments.retrieveVersion()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.assessments.bindAccount()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.delete()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.listLinked()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.listEnforcements()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.recordEnforcement()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.listOutcomes()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.recordOutcome()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.retrieveDecision()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.listCredentials()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.associateCredential()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.retireCredential()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.export()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.listDecisions()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.accounts.search()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.keyUsage.record()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.keys.rotate()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.keys.list()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.keys.create()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.keys.revoke()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.integrations.list()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.integrations.create()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.integrations.delete()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.integrations.rotate()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.list()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.create()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.delete()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.rotateSigningKey()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.sendTestEvent()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.listDeliveries()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.replayDelivery()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.aggregate()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.members.list()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.members.remove()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.members.update()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.audit.list()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.audit.getRetention()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.audit.updateRetention()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.audit.listStreams()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.audit.configureStream()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.audit.removeStream()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.audit.replayStream()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.usage.get()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.invites.list()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.invites.create()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.invites.revoke()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.invites.resend()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.settings.get()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.settings.update()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.settings.listHistory()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.settings.restore()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.settings.preview()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.requests.list()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.requests.aggregate()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.lists.list()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.lists.create()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.lists.delete()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.lists.preview()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.lists.change()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.lists.getChange()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.list()`: 
  *  `request.account_id` **Removed** (Breaking ⚠️)
  *  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.create()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.get()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.update()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.resolve()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.listComments()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.comment()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.listResolutions()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.listViews()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.createView()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.deleteView()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.updateView()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.export()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.listSubjects()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.addSubject()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.deleteSubject()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.erasures.get()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.exports.list()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.exports.create()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.exports.get()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.exports.cancel()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.exports.retry()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.exports.downloadChunk()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.evaluations.list()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.evaluations.create()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.evaluations.get()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.evaluations.getResult()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.evaluations.cancel()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.evaluations.publish()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.operations.summarize()`:  `response.code.enum(aggregate_erased_data)` **Added** (Breaking ⚠️)
* `SDK.reviews.query()`: **Added**

## 0.11.5

* `SDK.assessments.create()`:  `response.account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.assessments.aggregate()`: 
  *  `request.reason` **Changed**
  *  `response.buckets[].groups[].reason` **Changed** (Breaking ⚠️)
* `SDK.assessments.search()`: 
  *  `request.reason` **Changed**
  *  `response.items[].detail.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.assessments.retrieveVersion()`:  `response.detail.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.retrieveDecision()`:  `response.account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.export()`:  `response.assessments[].detail.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listDecisions()`:  `response.items[].account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.search()`:  `response.items[].latest.detail.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.settings.get()`:  `response.refused_sources[].enum(google)` **Added** (Breaking ⚠️)
* `SDK.settings.update()`: 
  *  `request.body.refused_sources[].enum(google)` **Added**
  *  `response.refused_sources[].enum(google)` **Added** (Breaking ⚠️)
* `SDK.settings.listHistory()`:  `response.items[].settings.refused_sources[].enum(google)` **Added** (Breaking ⚠️)
* `SDK.settings.restore()`:  `response.refused_sources[].enum(google)` **Added** (Breaking ⚠️)
* `SDK.requests.list()`:  `response.items[].decision.account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.evaluations.publish()`:  `response.refused_sources[].enum(google)` **Added** (Breaking ⚠️)

## 0.11.4

* `SDK.assessments.create()`:  `response.detail.risk.details.accounts` **Added**
* `SDK.assessments.get()`:  `response.detail.risk.details.accounts` **Added**
* `SDK.assessments.query()`:  `response.items[].risk.details.accounts` **Added**
* `SDK.assessments.search()`:  `response.items[].detail.risk.details.accounts` **Added**
* `SDK.assessments.retrieveVersion()`:  `response.detail.risk.details.accounts` **Added**
* `SDK.accounts.listAssessments()`:  `response.items[].risk.details.accounts` **Added**
* `SDK.accounts.export()`:  `response.assessments[].detail.risk.details.accounts` **Added**
* `SDK.accounts.search()`:  `response.items[].latest.detail.risk.details.accounts` **Added**

## 0.11.3

* `SDK.settings.get()`:  `response.refused_sources[]` **Changed** (Breaking ⚠️)
* `SDK.settings.update()`: 
  *  `request.body.refused_sources[]` **Changed**
  *  `response.refused_sources[]` **Changed** (Breaking ⚠️)
* `SDK.settings.listHistory()`:  `response.items[].settings.refused_sources[]` **Changed** (Breaking ⚠️)
* `SDK.settings.restore()`:  `response.refused_sources[]` **Changed** (Breaking ⚠️)
* `SDK.evaluations.publish()`:  `response.refused_sources[]` **Changed** (Breaking ⚠️)

## 0.11.2

* `SDK.accounts.listLinked()`: **Added**

## 0.11.1

* `SDK.assessments.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.recordOutcome()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.aggregate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.search()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.retrieveVersion()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.bindAccount()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listEnforcements()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.recordEnforcement()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listOutcomes()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.recordOutcome()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.retrieveDecision()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listCredentials()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.associateCredential()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.retireCredential()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.export()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listDecisions()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.search()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keyUsage.record()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keys.rotate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keys.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keys.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keys.revoke()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.rotate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.rotateSigningKey()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.sendTestEvent()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.listDeliveries()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.replayDelivery()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.aggregate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.members.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.members.remove()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.members.update()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.audit.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.audit.getRetention()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.audit.updateRetention()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.audit.listStreams()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.audit.configureStream()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.audit.removeStream()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.audit.replayStream()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.usage.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.invites.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.invites.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.invites.revoke()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.invites.resend()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.settings.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.settings.update()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.settings.listHistory()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.settings.restore()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.settings.preview()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.requests.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.requests.aggregate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.lists.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.lists.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.lists.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.lists.preview()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.lists.change()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.lists.getChange()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.update()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.resolve()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.listComments()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.comment()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.listResolutions()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.listViews()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.createView()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.deleteView()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.updateView()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.export()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.listSubjects()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.addSubject()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.reviews.deleteSubject()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.erasures.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.exports.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.exports.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.exports.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.exports.cancel()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.exports.retry()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.exports.downloadChunk()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.evaluations.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.evaluations.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.evaluations.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.evaluations.getResult()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.evaluations.cancel()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.evaluations.publish()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.operations.summarize()`:  `response.code` **Changed** (Breaking ⚠️)

## 0.11.0

* `SDK.assessments.search()`: 
  *  `request.identifier_expression` **Added**
  *  `response.items[].matched_identifiers` **Added**
* `SDK.accounts.search()`: 
  *  `request.identifier_expression` **Added**
  *  `response.items[].matched_identifiers` **Added**

## 0.10.4

* `SDK.assessments.search()`: 
  *  `request.identifier` **Added**
  *  `response.items[].matched_identifier` **Added**
* `SDK.accounts.search()`: 
  *  `request.identifier` **Added**
  *  `response.items[].matched_identifier` **Added**

## 0.10.3

* `SDK.accounts.search()`: 
  *  `request.needs_action` **Added**
  *  `response.items[].waiting_for` **Added**
* `SDK.reviews.list()`: 
  *  `request.account_id` **Added**
* `SDK.reviews.listViews()`:  `response.items[].filter.account_id` **Added**
* `SDK.reviews.createView()`: 
  *  `request.body.filter.account_id` **Added**
  *  `response.filter.account_id` **Added**
* `SDK.reviews.updateView()`: 
  *  `request.body.filter.account_id` **Added**
  *  `response.filter.account_id` **Added**

## 0.10.2

* `SDK.assessments.create()`:  `response.account.risk.reasons[].code.enum(no_email_matches)` **Added** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.account.risk.reasons[].code.enum(no_email_matches)` **Added** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.items[].risk.reasons[].code.enum(no_email_matches)` **Added** (Breaking ⚠️)
* `SDK.assessments.aggregate()`: 
  *  `request.reason.enum(no_email_matches)` **Added**
  *  `response.buckets[].groups[].reason.enum(no_email_matches)` **Added** (Breaking ⚠️)
* `SDK.assessments.search()`: 
  *  `request.reason.enum(no_email_matches)` **Added**
  *  `response.items[].detail.risk.reasons[].code.enum(no_email_matches)` **Added** (Breaking ⚠️)
* `SDK.assessments.retrieveVersion()`:  `response.detail.risk.reasons[].code.enum(no_email_matches)` **Added** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response.items[].risk.reasons[].code.enum(no_email_matches)` **Added** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.risk.reasons[].code.enum(no_email_matches)` **Added** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.items[].risk.reasons[].code.enum(no_email_matches)` **Added** (Breaking ⚠️)
* `SDK.accounts.retrieveDecision()`:  `response.account.risk.reasons[].code.enum(no_email_matches)` **Added** (Breaking ⚠️)
* `SDK.accounts.export()`:  `response.assessments[].detail.risk.reasons[].code.enum(no_email_matches)` **Added** (Breaking ⚠️)
* `SDK.accounts.listDecisions()`:  `response.items[].account.risk.reasons[].code.enum(no_email_matches)` **Added** (Breaking ⚠️)
* `SDK.accounts.search()`:  `response.items[].latest.detail.risk.reasons[].code.enum(no_email_matches)` **Added** (Breaking ⚠️)
* `SDK.requests.list()`:  `response.items[].decision.account.risk.reasons[].code.enum(no_email_matches)` **Added** (Breaking ⚠️)

## 0.10.1

* `SDK.accounts.search()`: **Added**

## 0.10.0

* `SDK.assessments.create()`:  `response.detail.risk.details.breach_names[]` **Changed**
* `SDK.assessments.get()`:  `response.detail.risk.details.breach_names[]` **Changed**
* `SDK.assessments.query()`:  `response.items[].risk.details.breach_names[]` **Changed**
* `SDK.assessments.search()`:  `response.items[].detail.risk.details.breach_names[]` **Changed**
* `SDK.assessments.retrieveVersion()`:  `response.detail.risk.details.breach_names[]` **Changed**
* `SDK.accounts.listAssessments()`:  `response.items[].risk.details.breach_names[]` **Changed**
* `SDK.accounts.export()`:  `response.assessments[].detail.risk.details.breach_names[]` **Changed**

## 0.9.0

* `SDK.assessments.aggregate()`: 
  *  `request.time_zone` **Added**
  *  `response.time_zone` **Added**

## 0.8.0

* `SDK.assessments.search()`: 
  *  `request` **Changed**
  *  `response` **Changed**

## 0.7.0

* `SDK.usage.get()`:  `response.console_lookups` **Added**

## 0.6.17

* `SDK.assessments.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.lists.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.lists.create()`: 
  *  `request.body.expires_at` **Added**
  *  `response` **Changed** (Breaking ⚠️)
* `SDK.lists.list()`: 
  *  `request` **Changed**
  *  `response` **Changed** (Breaking ⚠️)
* `SDK.requests.list()`: 
  *  `request.api_key_id` **Added**
  *  `response` **Changed** (Breaking ⚠️)
* `SDK.settings.update()`: 
  *  `request.body` **Changed**
  *  `response.code` **Changed** (Breaking ⚠️)
* `SDK.settings.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.replayDelivery()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.listDeliveries()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.sendTestEvent()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.rotateSigningKey()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.rotate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keys.revoke()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.keys.create()`: 
  *  `request.body` **Changed**
  *  `response` **Changed** (Breaking ⚠️)
* `SDK.keys.list()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.keys.rotate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keyUsage.record()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.export()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.accounts.retireCredential()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.associateCredential()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listCredentials()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.retrieveDecision()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.recordOutcome()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.accounts.listOutcomes()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.accounts.recordEnforcement()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.delete()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.bindAccount()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.retrieveVersion()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.search()`: 
  *  `request` **Changed**
  *  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.aggregate()`: 
  *  `request` **Changed**
  *  `response` **Changed** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.recordOutcome()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.delete()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.lists.getChange()`: **Added**
* `SDK.reviews.update()`: **Added**
* `SDK.exports.cancel()`: **Added**
* `SDK.exports.retry()`: **Added**
* `SDK.exports.downloadChunk()`: **Added**
* `SDK.evaluations.list()`: **Added**
* `SDK.evaluations.create()`: **Added**
* `SDK.evaluations.get()`: **Added**
* `SDK.evaluations.getResult()`: **Added**
* `SDK.evaluations.cancel()`: **Added**
* `SDK.evaluations.publish()`: **Added**
* `SDK.operations.summarize()`: **Added**
* `SDK.exports.create()`: **Added**
* `SDK.exports.list()`: **Added**
* `SDK.erasures.get()`: **Added**
* `SDK.reviews.deleteSubject()`: **Added**
* `SDK.reviews.addSubject()`: **Added**
* `SDK.reviews.listSubjects()`: **Added**
* `SDK.reviews.export()`: **Added**
* `SDK.reviews.updateView()`: **Added**
* `SDK.reviews.deleteView()`: **Added**
* `SDK.reviews.createView()`: **Added**
* `SDK.reviews.listViews()`: **Added**
* `SDK.reviews.listResolutions()`: **Added**
* `SDK.reviews.comment()`: **Added**
* `SDK.reviews.listComments()`: **Added**
* `SDK.reviews.resolve()`: **Added**
* `SDK.exports.get()`: **Added**
* `SDK.reviews.get()`: **Added**
* `SDK.reviews.create()`: **Added**
* `SDK.reviews.list()`: **Added**
* `SDK.accounts.listEnforcements()`: **Added**
* `SDK.lists.change()`: **Added**
* `SDK.lists.preview()`: **Added**
* `SDK.requests.aggregate()`: **Added**
* `SDK.settings.preview()`: **Added**
* `SDK.settings.restore()`: **Added**
* `SDK.settings.listHistory()`: **Added**
* `SDK.invites.resend()`: **Added**
* `SDK.invites.revoke()`: **Added**
* `SDK.invites.create()`: **Added**
* `SDK.invites.list()`: **Added**
* `SDK.usage.get()`: **Added**
* `SDK.audit.replayStream()`: **Added**
* `SDK.audit.removeStream()`: **Added**
* `SDK.audit.configureStream()`: **Added**
* `SDK.audit.listStreams()`: **Added**
* `SDK.audit.updateRetention()`: **Added**
* `SDK.audit.getRetention()`: **Added**
* `SDK.audit.list()`: **Added**
* `SDK.members.update()`: **Added**
* `SDK.members.remove()`: **Added**
* `SDK.members.list()`: **Added**
* `SDK.webhookEndpoints.aggregate()`: **Added**
* `SDK.accounts.listDecisions()`: **Added**

## 0.6.16

No changes detected.

## 0.6.15

* `SDK.assessments.aggregate()`: 
  *  `request.metrics[].enum(score_outcomes)` **Added**
  *  `response` **Changed** (Breaking ⚠️)

## 0.6.14

* `SDK.assessments.aggregate()`: **Added**
* `SDK.assessments.search()`: 
  *  `request.revision` **Added**

## 0.6.13

* `SDK.assessments.create()`:  `response.detail.identifiers` **Added**
* `SDK.assessments.get()`:  `response.detail.identifiers` **Added**
* `SDK.assessments.query()`:  `response.items[].identifiers` **Added**
* `SDK.assessments.search()`:  `response.items[].detail.identifiers` **Added**
* `SDK.assessments.retrieveVersion()`:  `response.detail.identifiers` **Added**
* `SDK.accounts.listAssessments()`:  `response.items[].identifiers` **Added**
* `SDK.accounts.export()`:  `response.assessments[].detail.identifiers` **Added**

## 0.6.12

* `SDK.webhookEndpoints.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keyUsage.record()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keys.rotate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.lists.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.lists.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.lists.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.settings.update()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.settings.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.replayDelivery()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.listDeliveries()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.sendTestEvent()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.create()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.assessments.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.recordOutcome()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.accounts.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.rotateSigningKey()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.recordEnforcement()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keys.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keys.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keys.revoke()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.rotate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.search()`: **Added**
* `SDK.assessments.bindAccount()`: **Added**
* `SDK.assessments.retrieveVersion()`: **Added**
* `SDK.requests.list()`: **Added**
* `SDK.accounts.export()`: **Added**
* `SDK.accounts.retireCredential()`: **Added**
* `SDK.accounts.listCredentials()`: **Added**
* `SDK.accounts.associateCredential()`: **Added**
* `SDK.accounts.retrieveDecision()`: **Added**
* `SDK.accounts.listOutcomes()`: **Added**
* `SDK.accounts.recordOutcome()`: **Added**

## 0.6.11

* `SDK.assessments.create()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.assessments.delete()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.assessments.recordOutcome()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.accounts.delete()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.accounts.recordEnforcement()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.keyUsage.record()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.keys.rotate()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.keys.create()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.keys.list()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.keys.revoke()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.integrations.create()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.integrations.list()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.integrations.delete()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.integrations.rotate()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.list()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.create()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.delete()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.rotateSigningKey()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.sendTestEvent()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.listDeliveries()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.webhookEndpoints.replayDelivery()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.settings.get()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.settings.update()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.lists.list()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.lists.create()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)
* `SDK.lists.delete()`:  `response.code.enum(list_entry_too_broad)` **Added** (Breaking ⚠️)

## 0.6.10

* `SDK.keys.rotate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keys.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.settings.update()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.create()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.assessments.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.recordOutcome()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.accounts.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.accounts.recordEnforcement()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keyUsage.record()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.settings.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.replayDelivery()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keys.revoke()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keys.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.rotate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.rotateSigningKey()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.sendTestEvent()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.listDeliveries()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.lists.list()`: **Added**
* `SDK.lists.create()`: **Added**
* `SDK.lists.delete()`: **Added**

## 0.6.9

* `SDK.webhookEndpoints.list()`:  `response.items[]` **Changed**
* `SDK.webhookEndpoints.create()`:  `response.endpoint` **Changed**

## 0.6.8

No changes detected.

## 0.6.7

* `SDK.assessments.create()`:  `response.detail.risk.summary.ip.asn` **Added**
* `SDK.assessments.get()`:  `response.detail.risk.summary.ip.asn` **Added**
* `SDK.assessments.query()`:  `response.items[].risk.summary.ip.asn` **Added**
* `SDK.accounts.listAssessments()`:  `response.items[].risk.summary.ip.asn` **Added**

## 0.6.6

No changes detected.

## 0.6.5

No changes detected.

## 0.6.4

No changes detected.

## 0.6.3

* `SDK.assessments.create()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.items[].risk.reasons[].weight` **Removed** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response.items[].risk.reasons[].weight` **Removed** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.risk.reasons[].weight` **Removed** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.items[].risk.reasons[].weight` **Removed** (Breaking ⚠️)

## 0.6.2

No changes detected.

## 0.6.1

No changes detected.

## 0.6.0

No changes detected.

## 0.5.7

* `SDK.assessments.create()`:  `response` **Changed**
* `SDK.assessments.get()`:  `response` **Changed**
* `SDK.assessments.query()`:  `response.items[].risk` **Changed**
* `SDK.accounts.listChanged()`:  `response.items[].risk.reasons[]` **Changed**
* `SDK.accounts.get()`:  `response.risk.reasons[]` **Changed**
* `SDK.accounts.listAssessments()`:  `response.items[].risk` **Changed**

## 0.5.6

* `SDK.assessments.create()`:  `response.account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)

## 0.5.5

* `SDK.integrations.create()`: 
  *  `request.platform.enum(supabase)` **Added**
  *  `response.platform.enum(supabase)` **Added** (Breaking ⚠️)
* `SDK.integrations.list()`:  `response.items[].platform.enum(supabase)` **Added** (Breaking ⚠️)
* `SDK.integrations.rotate()`:  `response.platform.enum(supabase)` **Added** (Breaking ⚠️)

## 0.5.4

* `SDK.assessments.create()`:  `response.account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)

## 0.5.3

No changes detected.

## 0.5.2

No changes detected.

## 0.5.1

* `SDK.accounts.recordEnforcement()`: 
  *  `request.body.action.enum(activate)` **Added**
  *  `response.action.enum(activate)` **Added** (Breaking ⚠️)

## 0.5.0

* `SDK.accounts.recordEnforcement()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.replayDelivery()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.listDeliveries()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.sendTestEvent()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.recordOutcome()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.rotateSigningKey()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keyUsage.record()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.keys.rotate()`:  `response` **Changed** (Breaking ⚠️)
* `SDK.integrations.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.delete()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.integrations.rotate()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.list()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.webhookEndpoints.create()`:  `response.code` **Changed** (Breaking ⚠️)
* `SDK.settings.update()`: **Added**
* `SDK.keys.list()`: **Added**
* `SDK.keys.create()`: **Added**
* `SDK.settings.get()`: **Added**
* `SDK.keys.revoke()`: **Added**

## 0.4.12

No changes detected.

## 0.4.11

No changes detected.

## 0.4.10

No changes detected.

## 0.4.9

No changes detected.

## 0.4.8

* `SDK.assessments.create()`:  `response.account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.account.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.risk.reasons[].code` **Changed** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.items[].risk.reasons[].code` **Changed** (Breaking ⚠️)

## 0.4.7

* `SDK.assessments.create()`:  `response.detail.incomplete_sources[].lane.enum(domain)` **Added** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.detail.incomplete_sources[].lane.enum(domain)` **Added** (Breaking ⚠️)
* `SDK.assessments.query()`:  `response.items[].incomplete_sources[].lane.enum(domain)` **Added** (Breaking ⚠️)
* `SDK.accounts.listAssessments()`:  `response.items[].incomplete_sources[].lane.enum(domain)` **Added** (Breaking ⚠️)

## 0.4.6

No changes detected.

## 0.4.5

No changes detected.

## 0.4.4

* `SDK.assessments.create()`:  `response.account.risk.decision.enum(held)` **Added** (Breaking ⚠️)
* `SDK.assessments.get()`:  `response.account.risk.decision.enum(held)` **Added** (Breaking ⚠️)
* `SDK.accounts.listChanged()`:  `response.items[].risk.decision.enum(held)` **Added** (Breaking ⚠️)
* `SDK.accounts.get()`:  `response.risk.decision.enum(held)` **Added** (Breaking ⚠️)

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
