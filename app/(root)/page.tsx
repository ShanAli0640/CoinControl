import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {
    const loggedIn = { firstName: 'Shan' };
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welecome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Access and manage your account and 
                        transactions efficently"
                    />
                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1250.24}
                    />
                </header>
            </div>
        </section>
    )
}

export default Home