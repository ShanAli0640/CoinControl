import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {
    const loggedIn = { firstName: 'Shan', lastName: 'Ali', email: 'shan.ali@yale.edu' };
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

                RECENT TRANSACTIONS
            </div>

            <RightSidebar user={loggedIn}
                transactions={[]}
                banks={[{ currentBalance: 123.50 }, { currentBalance: 500.01 }]}
            />
        </section>
    )
}

export default Home