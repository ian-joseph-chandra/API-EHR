// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.0 <0.9.0;

contract Records {
    struct Diagnose {
        address doctor;
        string detail;
    }

    mapping(address => mapping(address => mapping(string => mapping(string => Diagnose)))) private records;

    function create(
        address _patient,
        address _doctor,
        string memory _disease,
        string memory _detail,
        string memory _date
    ) public {
        records[_patient][msg.sender][_disease][_date] = Diagnose({
            doctor: _doctor,
            detail: _detail
        });
    }

    // function read_disease() public view returns ()

    function read(
        address _patient,
        address _hospital,
        string memory _disease,
        string memory _date
    ) public view returns (address _doctor, string memory _detail) {
        _doctor = records[_patient][_hospital][_disease][_date].doctor;
        _detail = records[_patient][_hospital][_disease][_date].detail;
    }
}
