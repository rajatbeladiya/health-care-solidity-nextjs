pragma solidity ^0.4.26;

import "./StringUtils.sol";

contract HealthCareHelper  {
    struct User {
        string firstName;
        string lastName;
        string role;
        mapping(address => bool) patients;
    }

    struct Meeting {
        address doctorAddress;
        address patientAddress;
        string disease;
        string medicine;
    }

    mapping(address => User) users;
    address[] userAccounts;
    address[] doctorAccounts;
    address[] patientAccounts;

    mapping(uint => Meeting) meetings;
    mapping(address => uint[]) userMeetings;
}