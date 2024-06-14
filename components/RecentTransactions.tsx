import Link from 'next/link'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'


const RecentTransactions = ({
    accounts,
    transactions = [],
    appwriteItemId,
    page = 1
}: RecentTransactionsProps) => {
    return (
        <section className='recent-transations'>
            <header className='flex items-cent justify-between'>
                <h2 className='recent-transactions-labe'>
                    Recent RecentTransactions
                    <Link href={`/transactions-history/?id=${appwriteItemId}`} className='view-all-btn'>
                        View All
                    </Link>
                </h2>
            </header>
            <Tabs defaultValue={appwriteItemId} className="w-full">
                <TabsList className='recent-transactions-tablist'>
                    {accounts.map((account: Account) => (
                        <TabsTrigger key={account.id} value={account.appwriteItemId}>
                            <BankTabItem
                                key={account.id}
                                account={account}
                                appwriteItemId={appwriteItemId}
                            />
                        </TabsTrigger>
                    ))}
                </TabsList>
                {accounts.map((account: Account) => (
                    <TabsContent
                        value={account.appwriteItemId}
                        key={account.id}
                        className='space-y-4'>
                        <BankInfo
                            account={account}
                            appwriteItemId={appwriteItemId}
                            type="full"
                        />
                        <TransactionsTable transactions={transactions} />
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    )
}

export default RecentTransactions