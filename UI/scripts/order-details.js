const allOrderDiv = document.getElementById('all-order');
const canceledOrderDiv = document.getElementById('canceled-order');
const deliveredOrderDiv = document.getElementById('delivered-order');
const pendingOrderDiv = document.getElementById('pending-order');

const displayAllOrderButton = document.getElementById('displayAllOrders');
const displayDeliveredOrderButton = document.getElementById('displayDeliveredOrders');
const displayCanceledOrderButton = document.getElementById('displayCanceledOrders');
const displayPendingOrderButton = document.getElementById('displayPendingOrders');

allOrderDiv.style.display = 'block';
canceledOrderDiv.style.display = 'none';
deliveredOrderDiv.style.display = 'none';
pendingOrderDiv.style.display = 'none';

function hideAllButOneHistory(history) {
    const allHistoryDiv = [allOrderDiv, canceledOrderDiv, deliveredOrderDiv, pendingOrderDiv]
    for (let i = 0; i < allHistoryDiv.length; i++) {
        const element = allHistoryDiv[i];
        if (element === history) {
            history.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }
}

displayAllOrderButton.addEventListener('click', () => {
    hideAllButOneHistory(allOrderDiv)
});
displayCanceledOrderButton.addEventListener('click', () => {
    hideAllButOneHistory(canceledOrderDiv)
});
displayDeliveredOrderButton.addEventListener('click', () => {
    hideAllButOneHistory(deliveredOrderDiv)
});
displayPendingOrderButton.addEventListener('click', () => {
    hideAllButOneHistory(pendingOrderDiv)
});