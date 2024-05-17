/* eslint-disable */
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

function AddTeams() {
    const [teamsPop, setTeamsPop] = useState(false)
    function handleTeamspop() {
        setTeamsPop(true)
    }
    function handelCloseTeams() {
        setTeamsPop(false)
    }

    return (
        <>
            {teamsPop ?
                <div className="addverif-popup-main addteams-main">
                    <div className="addverif-popup-main_inner_sec addteams-inner">
                        <button className="close-btn-verif" onClick={handelCloseTeams}><AiOutlineClose /></button>
                        <div className="addverif-popup">
                            <h2>Add Team Member</h2>
                            <form>
                            <div className='modal_form_verficatn_btn_main'>
                                <div className='modal_form_verficatn_btn_main_inner add-teams-fname'>
                                    <label><span>First Name</span></label>
                                    <input type='text' name='fname'/>
                                </div>
                                <div className='modal_form_verficatn_btn_main_inner add-teams-lname'>
                                    <label><span>Last Name</span></label>
                                    <input type='text' name='lname'/>
                                </div>
                                </div>
                                <div className='modal_form_verficatn_btn_main'>
                                    <div className='modal_form_verficatn_btn_main_inner add-teams-email'>
                                        <label><span>E-mail</span></label>
                                        <input type='text' name='e-mail'/>
                                    </div>
                                    <div className='modal_form_verficatn_btn_main_inner add-teams-selectrole'>
                                    <label><span >Role</span></label>
                                        <select>
                                            <option>role1</option>
                                            <option>role2</option>
                                            <option>role3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='modal_form_verficatn_btn_main'>
                                    <div className='modal_form_verficatn_btn_main_inner add-teams-date-added'>
                                        <label><span>Date</span></label>
                                        <input type='date' name='date-added' />
                                    </div>
                                    <button className="loaderImageS" >create</button>
                                </div>
                                
                            </form>
                        </div>

                    </div>
                </div>

                : null}
            <div className="addverification-button addteams-main">
                <button onClick={handleTeamspop}>Add Teams</button>
            </div>
        </>
    )
}
export default AddTeams
