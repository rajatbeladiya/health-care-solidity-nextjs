pragma solidity ^0.4.26;

import "./HealthCareUtils.sol";

contract HealthCare is HealthCareUtils {
    function signUp(string memory _firstName, string memory _lastName, string memory _role) public
        alreadyRegistered validateRegistration(_firstName, _lastName, _role) {
        users[msg.sender] = User({
            firstName: _firstName,
            lastName: _lastName,
            role: _role
        });
        userAccounts.push(msg.sender);
        if (StringUtils.equal(_role, "doctor")) {
            doctorAccounts.push(msg.sender);
        } else if (StringUtils.equal(_role, "patient")) {
            patientAccounts.push(msg.sender);
        }
    }

    function delicateAccessToDoctor(address _doctorAddress, bool _isDelicate) public isPatient(msg.sender) {
        users[_doctorAddress].patients[msg.sender] = _isDelicate;
    }

    function addMeeting(address _patientAddress, string memory _disease, string memory _medicine) public isDoctor(msg.sender) {
        uint meetingId = uint(keccak256(now, msg.sender));
        meetings[meetingId] = Meeting({
            doctorAddress: msg.sender,
            patientAddress: _patientAddress,
            disease: _disease,
            medicine: _medicine
        });
        userMeetings[msg.sender].push(meetingId);
        userMeetings[_patientAddress].push(meetingId);
    }

    function getPatientMeetingsList(address _patientAddress) public view returns (uint[] memory) {
        return userMeetings[_patientAddress];
    }

    function getMeetingDetails(uint _meetingId) private view  returns (address, address, string memory, string memory) {
        return (
            meetings[_meetingId].doctorAddress,
            meetings[_meetingId].patientAddress,
            meetings[_meetingId].disease,
            meetings[_meetingId].medicine
        );
    }

    function getUserAccounts() public view returns (address[] memory) {
        return userAccounts;
    }

    function getDoctorAccounts() public view returns (address[] memory) {
        return doctorAccounts;
    }

    function getUserDetail(address _userAddress) public view returns (string memory, string memory, string memory) {
        return (users[_userAddress].firstName, users[_userAddress].lastName, users[_userAddress].role);
    }

    function getPatientAccounts() public view returns (address[] memory) {
        return patientAccounts;
    }

    function isDoctorDelicated(address _patientAddress, address _doctorAddress) public view returns (bool) {
        return users[_doctorAddress].patients[_patientAddress];
    }
}