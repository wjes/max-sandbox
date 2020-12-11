# Introduction

**IMAGE**

Legend: 

* EL : Exact Logic
* NL : Non-Exact Logic
* ML : Missing Logic
* LU : Limits Undefined

## Node: EL
> Exact Logic

Nothing to do. All the limits are well defined and the logic exists.

## Node: NL + LU
> Non-Exact Logic + Limits Undefined

Returns the logic that matches the most essays. It also returns the list of limits that were not defined, preventing the logic from falling into the exact logic or missing logic scenario. 

Depending on how many limits are created within this very node (some or all of them) we will fall into the exact/missing logic scenario or we'll stay in this one. 

## Node: ML
> Missing Logic

Even though the limits are well defined there's no logic for them. After creating the missing logic this will jump to the exact logic scenario.

## Node: ML + LU
> Missing Logic + Limits Undefined

Some of the limits are defined but there's no logic for them. You decide which issue to address first: (1) creating a non-exact logic or (2) adding the undefined limits. 







