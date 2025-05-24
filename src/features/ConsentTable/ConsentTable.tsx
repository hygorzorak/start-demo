import { Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Typography, TablePagination } from "@mui/material";
import { useState } from "react";

import { useQueryConsent } from "./useQueryConsent";
import { formatConsentText } from "~/shared/consent";
import type { Consent } from "~/shared/consent";

export function ConsentTable() {
    const { data: consents, isLoading, isFetched } = useQueryConsent()
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    if (isLoading || !isFetched) {
        return <CircularProgress />
    }

    const paginatedConsents = consents?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) ?? [];

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Consent</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedConsents.length ? paginatedConsents.map((item: Consent) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                                {formatConsentText({
                                    ads: item.ads,
                                    newsletter: item.newsletter,
                                    statistics: item.statistics,
                                })}
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={3}>No data</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={consents?.length ?? 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10]}
            />
        </>
    )
}