Feature: Initiate Payment
  Scenario: Successful Payment Initiation
    Given I have an order with ID "order123"
    When I initiate the payment for the order
    Then the payment gateway should receive a request to create a payment for "order123"
