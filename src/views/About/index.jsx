import { useState } from 'react'
import { useSelector } from 'react-redux'
import './index.sass'
import PersonalStatement from './PersonalStatement'
import ProjectList from './ProjectList'
import list from './projects.json'
import Resume from './Resume'

export default function About() {
    const [tab, setTab] = useState('projects')
    const theme = useSelector(state => state.user.preference.theme)

    const tabClassName = (thisTag, voidItem = false) => {
        const className = voidItem
            ? 'myapp-about-main-center-tabs-voiditem'
            : 'myapp-about-main-center-tabs-item'
        if (thisTag === tab) {
            return className + '-chosen-' + theme
        }
        return className
    }

    return (
        <div className="myapp-about">
            <div className="myapp-about-main-left">
                <Resume />
            </div>

            <div className="myapp-about-main-center">
                <div className="myapp-about-main-center-tabs">
                    <span className={tabClassName('projects')}
                        onClick={() => setTab('projects')}
                    >
                        个人项目
                    </span>
                    <span className={tabClassName('projects', true)}>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>

                    <span className={tabClassName('statement')}
                        onClick={() => setTab('statement')}
                    >
                        个人说明
                    </span>
                    <span className={tabClassName('statement', true)}>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                </div>

                <div className='myapp-about-main-center-content'>
                    {tab === 'projects'
                    && (
                        <div className="myapp-about-main-center-content-projects">
                            <div className="myapp-about-main-center-content-projects-headline">
                                个人项目
                            </div>
                            <hr />
                            <ProjectList list={list}/>
                        </div>
                    )}
                    {tab === 'statement'
                    && (
                        <PersonalStatement />
                    )}
                </div>
            </div>
        </div>
    )
}