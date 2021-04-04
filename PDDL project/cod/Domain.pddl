(define(domain breadMachine)
    (:predicates
        (enoughWater )
        (enoughButter)
        (enoughFlour)
        (enoughYeast)
        (enoughSalt)
        (enoughSugar)
        (enoughMilk)
        (hasEgg)
        (enoughRumEssence)
        
        (enoughSesame)
        (enoughPoppy)
        (enoughCaraway)
        
        (enoughRaisin)
        (enoughNut)
        (enoughCocoa)
        
        (dough)
        (sweetDough)
        
        
        (simpleBread ?a)
        (sweetBread ?c)
        (seedBread ?b)
        (sweetBread2 ?d)
        
        (startButton)
        (simpleBreadButton)
        (seedBreadButton)
        (sweetBreadButton)
        (sweetBreadButton2)
        
        (mixDoughButton)
        (mixSweetDoughButton)
        
        
    )    
    
    (:requirements :strips)
    
    (:action turnOnTheMachine
     :parameters()
     :precondition (not(startButton))
     :effect(startButton)
    )
    
    (:action pourWater
     :parameters()
     :precondition(not(enoughWater))
     :effect(enoughWater)
    )
    
    (:action addButter
     :parameters()
     :precondition(not(enoughButter))
     :effect(enoughButter)
    )
    
    (:action addFlour
     :parameters()
     :precondition(not(enoughFlour))
     :effect(enoughFlour)
    )
    
    (:action addYeast
     :parameters()
     :precondition(not(enoughYeast))
     :effect(enoughYeast)
    )
    
    (:action addSalt
     :parameters()
     :precondition(not(enoughSalt))
     :effect(enoughSalt)
    )
    
    (:action addSugar
     :parameters()
     :precondition(not(enoughSugar))
     :effect(enoughSugar)
    )
    
    (:action pesssMixDoughButton
    :parameters()
    :precondition(and (startButton) (enoughWater) (enoughButter) (enoughFlour) (enoughYeast) (enoughSalt) (enoughSugar))
    :effect(mixDoughButton)
    )
    
    (:action mixDough
     :parameters()
     :precondition(mixDoughButton)
     :effect(and (dough) (not(mixDoughButton)) (not(startButton)) (not(enoughWater)) (not(enoughButter)) (not (enoughFlour)) (not(enoughYeast)) (not(enoughSalt)) (not(enoughSugar)))
    )
    
    (:action addSesame
     :parameters()
     :precondition(and (not(enoughSesame)) (dough))
     :effect(enoughSesame)
    )
    
    (:action addPoppy
     :parameters()
     :precondition(and (not(enoughPoppy)) (dough))
     :effect(enoughPoppy)
    )
    
    (:action addCaraway
     :parameters()
     :precondition(and (not(enoughCaraway)) (dough))
     :effect(enoughCaraway)
    )
    
    (:action makeSeedBread
     :parameters(?b)
     :precondition(and (seedBreadButton) (dough) (enoughSesame) (enoughPoppy) (enoughCaraway))
     :effect(and (seedBread ?b) (not(seedBreadButton)) (not(dough)))
    )
    
    (:action addMilk
     :parameters()
     :precondition (not(enoughMilk))
     :effect(enoughMilk)
    )
    
    (:action addEgg
     :parameters()
     :precondition (not(hasEgg))
     :effect(hasEgg)
    )
    
    (:action addRumEssence
     :parameters()
     :precondition (not(enoughRumEssence))
     :effect(enoughRumEssence)
    )
    
    (:action mixSweetDough
     :parameters()
     :precondition(mixSweetDoughButton)
     :effect(and (sweetDough) (not(mixSweetDoughButton)) (not(startButton)) (not(enoughMilk)) (not(enoughButter)) (not(enoughFlour)) (not(enoughYeast)) (not(enoughSalt)) (not(enoughSugar)) (not(hasEgg)) (not(enoughRumEssence)))
    )
    
    (:action pressMixSweetButton
     :parameters()
     :precondition(and (startButton) (enoughMilk) (enoughButter) (enoughFlour) (enoughYeast) (enoughSalt) (enoughSugar) (hasEgg) (enoughRumEssence))
     :effect(mixSweetDoughButton)
    )
    
    (:action addNut
     :parameters()
     :precondition (and (not(enoughNut)) (sweetDough))
     :effect(enoughNut)   
    )
    
    (:action addRaisin
     :parameters()
     :precondition (and (not(enoughRaisin)) (sweetDough))
     :effect(enoughRaisin)   
    )
    
    (:action addCocoa
     :parameters()
     :precondition(and (not(enoughCocoa)) (sweetDough))
     :effect(enoughCocoa)
    )
    
    (:action pressButtonSimpleBread
     :parameters()
     :precondition(and (not(simpleBreadButton)) (dough))
     :effect(simpleBreadButton)
    )
    
    (:action pressButtonSeedBread
     :parameters()
     :precondition(and (not(seedBreadButton)) (dough) (enoughSesame) (enoughCaraway) (enoughPoppy))
     :effect(seedBreadButton)
    )
    
    (:action pressSweetButton1
     :parameters()
     :precondition(and (not(sweetBreadButton)) (sweetDough) (enoughNut) (enoughRaisin))
     :effect(sweetBreadButton)
    )
    
    (:action pressSweetButton2
     :parameters()
     :precondition(and (not(sweetBreadButton2)) (sweetDough) (enoughCocoa))
     :effect(sweetBreadButton2)
    )
    
    (:action makeSweetBread
     :parameters(?c)
     :precondition(and (sweetBreadButton) (sweetDough) (enoughNut) (enoughRaisin))
     :effect(and (sweetBread ?c) (not(sweetBreadButton)) (not(sweetDough)) (not(enoughNut)) (not(enoughRaisin)))
    )
    
    (:action makeSweetBread2
     :parameters(?d)
     :precondition(and (sweetBreadButton2) (sweetDough) (enoughCocoa))
     :effect(and (sweetBread2 ?d) (not(sweetBreadButton2)) (not(sweetDough)) (not(enoughCocoa)))
    )
    
    (:action makeBread
     :parameters(?a)
     :precondition(and (simpleBreadButton) (dough))
     :effect(and (simpleBread ?a) (not(simpleBreadButton)) (not(dough)))
    )
)