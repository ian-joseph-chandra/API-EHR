// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.0 <0.9.0;

contract Records {
    struct Record {
        address doctor;
        string diagnose;
    }

    mapping(address => mapping(address => mapping(string => mapping(string => Record)))) private records;

    function create(
        address _patient,
        address _doctor,
        string memory _disease,
        string memory _diagnose,
        string memory _date
    ) public {
        records[_patient][msg.sender][_disease][_date] = Record({
            doctor: _doctor,
            diagnose: _diagnose
        });
    }

    // function read_disease() public view returns ()

    function read(
        address _patient,
        address _hospital,
        string memory _disease,
        string memory _date
    ) public view returns (address _doctor, string memory _diagnose) {
        _doctor = records[_patient][_hospital][_disease][_date].doctor;
        _diagnose = records[_patient][_hospital][_disease][_date].diagnose;
    }
}
