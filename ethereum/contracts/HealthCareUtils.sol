pragma solidity ^0.4.26;

import "./HealthCareHelper.sol";

contract HealthCareUtils is HealthCareHelper {
    string unauthorisedMessage = "Unauthorised";

    modifier isAuthenticated() {
        require((
            StringUtils.equal(users[msg.sender].role, "doctor")
            || StringUtils.equal(users[msg.sender].role, "patient")
            ), unauthorisedMessage);
        _;
    }

    modifier alreadyRegistered() {
        require(
            !StringUtils.equal(users[msg.sender].role, "doctor"),
            "You are already registered as Doctor!"
            );
        require(
            !StringUtils.equal(users[msg.sender].role, "patient"),
            "You are already registered as Patient!"
            );
        _;
    }

    modifier validateRegistration(string memory _firstName, string memory _lastName, string memory _role) {
        require(
            bytes(_firstName).length > 0,
            "firstName is required"
            );
        require(
            bytes(_lastName).length > 0,
            "lastName is required"
            );
        require(
            bytes(_role).length > 0,
            "role is required"
            );
        require(
            StringUtils.equal(_role, "doctor") || StringUtils.equal(_role, "patient"),
            "Invalid role"
            );
        _;
    }

    modifier isDoctor(address _address) {
        require(
            StringUtils.equal(users[_address].role, "doctor"),
            unauthorisedMessage
        );
        _;
    }

    modifier isPatient(address _address) {
        require(
            StringUtils.equal(users[_address].role, "patient"),
            unauthorisedMessage
        );
        _;
    }

    // modifier isOwner(address _address) {
    //     require(
    //         _address == msg.sender,
    //         unauthorisedMessage
    //         );
    //     _;
    // }

    modifier isDeligated(address _patientAddress) {
        require((
            _patientAddress == msg.sender || users[msg.sender].patients[_patientAddress]
            ), unauthorisedMessage);
        _;
    }
}
